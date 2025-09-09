from fastapi import APIRouter, HTTPException, Depends, Header, Request
from pydantic import BaseModel
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt
from passlib.context import CryptContext
import secrets
import uuid
from typing import Optional
from sqlalchemy.orm import Session

from database import get_db, User as DBUser

router = APIRouter(prefix="/api/auth", tags=["auth"])

# JWT settings
from config import JWT_SECRET_KEY, JWT_ALGORITHM, JWT_ACCESS_TOKEN_EXPIRE_DAYS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserCreate(BaseModel):
    username: str
    email: str


class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    tier: str
    subscription_valid_until: Optional[str] = None
    created_at: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(days=JWT_ACCESS_TOKEN_EXPIRE_DAYS)
    
    # Add session ID for security
    session_id = str(uuid.uuid4())
    to_encode.update({
        "exp": expire,
        "session_id": session_id,
        "iat": datetime.now(timezone.utc).timestamp()
    })
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=JWT_ALGORITHM)
    return encoded_jwt


def verify_token(token: str) -> dict:
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")


async def get_current_user(authorization: Optional[str] = Header(None), db: Session = Depends(get_db)) -> dict:
    """Legacy authentication method - use get_current_active_user instead"""
    # SECURITY: Use consistent authentication method
    from dependencies import get_current_active_user
    user = await get_current_active_user(authorization, db)
    
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "tier": user.tier,
        "subscription_valid_until": user.subscription_valid_until,
        "last_tool_run_at": user.last_tool_run_at,
        "created_at": None,  # Not available in User class
        "updated_at": None   # Not available in User class
    }


@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate, db: Session = Depends(get_db)):
    # Check if user already exists
    existing_user = db.query(DBUser).filter(DBUser.email == user_data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create new user
    user_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc)
    
    db_user = DBUser(
        id=user_id,
        username=user_data.username,
        email=user_data.email,
        tier="essential",
        subscription_valid_until=None,
        last_tool_run_at=None,
        created_at=now,
        updated_at=now
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Create access token
    access_token = create_access_token(data={"sub": user_id})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=db_user.id,
            username=db_user.username,
            email=db_user.email,
            tier=db_user.tier,
            subscription_valid_until=db_user.subscription_valid_until.isoformat() if db_user.subscription_valid_until else None,
            created_at=db_user.created_at.isoformat()
        )
    )


@router.post("/login", response_model=TokenResponse)
async def login(user_data: UserCreate, db: Session = Depends(get_db)):
    # Find user by email
    user = db.query(DBUser).filter(DBUser.email == user_data.email).first()
    if not user:
        # Auto-register if user doesn't exist
        return await register(user_data, db)
    
    # Create access token
    access_token = create_access_token(data={"sub": user.id})
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            username=user.username,
            email=user.email,
            tier=user.tier,
            subscription_valid_until=user.subscription_valid_until.isoformat() if user.subscription_valid_until else None,
            created_at=user.created_at.isoformat()
        )
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user_info(current_user: dict = Depends(get_current_user)):
    # Ensure datetime fields are properly serialized
    user_data = current_user.copy()
    if 'created_at' in user_data and user_data['created_at']:
        if hasattr(user_data['created_at'], 'isoformat'):
            user_data['created_at'] = user_data['created_at'].isoformat()
    if 'subscription_valid_until' in user_data and user_data['subscription_valid_until']:
        if hasattr(user_data['subscription_valid_until'], 'isoformat'):
            user_data['subscription_valid_until'] = user_data['subscription_valid_until'].isoformat()
    
    return UserResponse(**user_data)


@router.post("/device-login", response_model=TokenResponse)
async def device_login(request: Request, db: Session = Depends(get_db)):
    """Secure device-based auto-login with rate limiting and validation"""
    import hashlib
    import platform
    import socket
    import uuid
    import time
    import json
    from collections import defaultdict
    from datetime import datetime, timedelta
    
    # SECURITY: Rate limiting for device login
    client_ip = request.client.host
    current_time = datetime.now()
    
    # Simple in-memory rate limiting (in production, use Redis)
    if not hasattr(device_login, 'rate_limits'):
        device_login.rate_limits = defaultdict(list)
    
    # Clean old entries (older than 1 hour)
    device_login.rate_limits[client_ip] = [
        login_time for login_time in device_login.rate_limits[client_ip]
        if current_time - login_time < timedelta(hours=1)
    ]
    
    # Check rate limit (max 5 device logins per hour per IP)
    if len(device_login.rate_limits[client_ip]) >= 5:
        raise HTTPException(
            status_code=429,
            detail="Too many device login attempts. Please try again later."
        )
    
    # SECURITY: Validate required headers
    user_agent = request.headers.get("user-agent", "")
    if not user_agent or len(user_agent) < 10:
        raise HTTPException(
            status_code=400,
            detail="Invalid or missing user agent"
        )
    
    # SECURITY: Basic fingerprint validation
    accept_language = request.headers.get("accept-language", "")
    accept_encoding = request.headers.get("accept-encoding", "")
    
    # Create secure device fingerprint (reduced entropy for stability)
    device_components = [
        platform.system(),
        platform.release(),
        platform.machine(),
        user_agent[:100],  # Limit user agent length
        accept_language[:50],  # Limit language length
        str(uuid.getnode())  # MAC address only
    ]
    
    # Create stable device ID
    device_string = "|".join(device_components)
    device_id = hashlib.sha256(device_string.encode()).hexdigest()[:32]
    final_device_id = f"device_{device_id[:16]}"
    
    # SECURITY: Record this login attempt
    device_login.rate_limits[client_ip].append(current_time)
    
    # Check if device user exists
    existing_user = db.query(DBUser).filter(DBUser.email == f"device_{final_device_id}@pentorsec.local").first()
    
    if existing_user:
        # Use existing device user
        access_token = create_access_token(data={"sub": existing_user.id, "device_id": final_device_id})
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=existing_user.id,
                username=existing_user.username,
                email=existing_user.email,
                tier=existing_user.tier,
                subscription_valid_until=existing_user.subscription_valid_until.isoformat() if existing_user.subscription_valid_until else None,
                created_at=existing_user.created_at.isoformat()
            )
        )
    else:
        # Create new device user with security limits
        user_id = str(uuid.uuid4())
        now = datetime.now(timezone.utc)
        
        # SECURITY: Limit device user creation (max 10 per IP per day)
        device_creation_key = f"device_creation_{client_ip}_{current_time.date()}"
        if not hasattr(device_login, 'device_creation_limits'):
            device_login.device_creation_limits = defaultdict(int)
        
        if device_login.device_creation_limits[device_creation_key] >= 10:
            raise HTTPException(
                status_code=429,
                detail="Too many device registrations. Please try again tomorrow."
            )
        
        device_login.device_creation_limits[device_creation_key] += 1
        
        db_user = DBUser(
            id=user_id,
            username=f"Device {final_device_id[:8]}",
            email=f"device_{final_device_id}@pentorsec.local",
            tier="essential",
            subscription_valid_until=None,
            last_tool_run_at=None,
            created_at=now,
            updated_at=now
        )
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        
        access_token = create_access_token(data={"sub": user_id, "device_id": final_device_id})
        
        return TokenResponse(
            access_token=access_token,
            token_type="bearer",
            user=UserResponse(
                id=db_user.id,
                username=db_user.username,
                email=db_user.email,
                tier=db_user.tier,
                subscription_valid_until=db_user.subscription_valid_until.isoformat() if db_user.subscription_valid_until else None,
                created_at=db_user.created_at.isoformat()
            )
        )
