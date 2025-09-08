"""
Security service for authentication and authorization functions.
This service contains all security-related functions extracted from server.py
"""

import json
import re
from typing import Optional, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from database import get_db, User as DBUser
from utils.validation import sanitize_input


def _safe_json_loads(json_str: str, default=None):
    """Safely parse JSON string with error handling"""
    if not json_str:
        return default or []
    try:
        # SECURITY: Limit JSON size to prevent DoS
        if len(json_str) > 10000:  # 10KB limit
            return default or []
        return json.loads(json_str)
    except (json.JSONDecodeError, TypeError, ValueError):
        return default or []


def validate_vulnerability_title(title: str) -> str:
    """Validate and sanitize vulnerability title"""
    if not title or not title.strip():
        raise ValueError('Title cannot be empty')
    
    # Use helper function for sanitization
    sanitized = sanitize_input(title, 200)
    if len(sanitized) > 200:
        raise ValueError('Title too long (max 200 characters)')
    
    # Check for XSS patterns
    dangerous_patterns = [
        r'<script[^>]*>',  # Script tags
        r'javascript:',     # JavaScript protocol
        r'on\w+\s*=',      # Event handlers
        r'data:text/html', # Data URLs
        r'vbscript:',      # VBScript
        r'expression\s*\(', # CSS expressions
    ]
    
    for pattern in dangerous_patterns:
        if re.search(pattern, sanitized, re.IGNORECASE):
            raise ValueError('Title contains potentially dangerous content')
    
    return sanitized


def validate_vulnerability_payload(payload: str) -> str:
    """Validate and sanitize payload"""
    if not payload or not payload.strip():
        raise ValueError('Payload cannot be empty')
    
    payload = payload.strip()
    if len(payload) > 5000:
        raise ValueError('Payload too long (max 5000 characters)')
    
    # Allow payload content but sanitize for display
    # Note: We keep the original payload for security research purposes
    # but we'll sanitize it when displaying
    return payload


def validate_vulnerability_description(description: str) -> str:
    """Validate and sanitize how it works description"""
    if not description or not description.strip():
        raise ValueError('How it works cannot be empty')
    
    # Use helper function for sanitization
    sanitized = sanitize_input(description, 10000)
    if len(sanitized) > 10000:
        raise ValueError('Description too long (max 10000 characters)')
    
    # Check for XSS patterns
    dangerous_patterns = [
        r'<script[^>]*>',  # Script tags
        r'javascript:',     # JavaScript protocol
        r'on\w+\s*=',      # Event handlers
        r'data:text/html', # Data URLs
        r'vbscript:',      # VBScript
        r'expression\s*\(', # CSS expressions
    ]
    
    for pattern in dangerous_patterns:
        if re.search(pattern, sanitized, re.IGNORECASE):
            raise ValueError('Description contains potentially dangerous content')
    
    return sanitized


def validate_severity(severity: str) -> str:
    """Validate severity level"""
    valid_severities = ['critical', 'high', 'medium', 'low']
    if severity not in valid_severities:
        raise ValueError(f'Severity must be one of: {valid_severities}')
    return severity


def get_user_by_id(user_id: str, db: Session) -> Optional[DBUser]:
    """Get user by ID from database"""
    return db.query(DBUser).filter(DBUser.id == user_id).first()


def verify_project_ownership(project_id: str, user_id: str, db: Session) -> bool:
    """Verify that a project belongs to a specific user"""
    from database import Project as DBProject
    project = db.query(DBProject).filter(
        DBProject.id == project_id,
        DBProject.user_id == user_id
    ).first()
    return project is not None


def verify_note_ownership(note_id: str, user_id: str, db: Session) -> bool:
    """Verify that a note belongs to a specific user"""
    from database import Note as DBNote
    note = db.query(DBNote).filter(
        DBNote.id == note_id,
        DBNote.user_id == user_id
    ).first()
    return note is not None


def verify_vulnerability_ownership(vuln_id: str, user_id: str, db: Session) -> bool:
    """Verify that a vulnerability belongs to a specific user"""
    from database import Vulnerability as DBVulnerability
    vuln = db.query(DBVulnerability).filter(
        DBVulnerability.id == vuln_id,
        DBVulnerability.user_id == user_id
    ).first()
    return vuln is not None


def sanitize_user_input_for_logging(user_input: str, max_length: int = 8) -> str:
    """Sanitize user input for safe logging"""
    if not user_input:
        return "None"
    return str(user_input)[:max_length] + "..." if len(str(user_input)) > max_length else str(user_input)
