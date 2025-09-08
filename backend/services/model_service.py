"""
Model service for Pydantic models and data conversion.
This service contains all model-related functions extracted from server.py
"""

import json
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from pydantic import BaseModel, Field, validator
from enum import Enum
import uuid
import re
from services.security_service import (
    validate_vulnerability_title,
    validate_vulnerability_payload,
    validate_vulnerability_description,
    validate_severity
)


# Enums
class ProjectStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PAUSED = "paused"
    PLANNING = "planning"


class TargetType(str, Enum):
    DOMAIN = "domain"
    IP = "ip" 
    CIDR = "cidr"
    URL = "url"


class VulnerabilitySeverity(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"
    INFO = "info"


class ToolStatus(str, Enum):
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PENDING = "pending"


# Target Models
class Target(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    target_type: TargetType
    value: str
    description: Optional[str] = None
    is_in_scope: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class TargetCreate(BaseModel):
    target_type: TargetType
    value: str
    description: Optional[str] = None
    is_in_scope: bool = True


# Project Models
class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    team_members: List[str] = []
    targets: List[Target] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ProjectCreate(BaseModel):
    name: str
    description: Optional[str] = None
    status: ProjectStatus = ProjectStatus.PLANNING
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    team_members: List[str] = []


class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ProjectStatus] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    team_members: Optional[List[str]] = None


# Note Models
class Note(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    title: str
    content: str
    tags: List[str] = []
    user_id: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class NoteCreate(BaseModel):
    project_id: str
    title: str
    content: str
    tags: List[str] = []


class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    tags: Optional[List[str]] = None


# Collaboration Models
class ProjectInviteCreate(BaseModel):
    email: str
    role: str = "member"  # member, admin, viewer


# Vulnerability Models
class VulnerabilityCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200, description="Vulnerability title")
    payload: str = Field(..., min_length=1, max_length=5000, description="Exploit payload")
    how_it_works: str = Field(..., min_length=1, max_length=10000, description="Vulnerability explanation")
    severity: str = Field(..., description="Severity level")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate and sanitize vulnerability title"""
        return validate_vulnerability_title(v)
    
    @validator('payload')
    def validate_payload(cls, v):
        """Validate and sanitize payload"""
        return validate_vulnerability_payload(v)
    
    @validator('how_it_works')
    def validate_how_it_works(cls, v):
        """Validate and sanitize how it works description"""
        return validate_vulnerability_description(v)
    
    @validator('severity')
    def validate_severity(cls, v):
        """Validate severity level"""
        return validate_severity(v)


class VulnerabilityUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="Vulnerability title")
    payload: Optional[str] = Field(None, min_length=1, max_length=5000, description="Exploit payload")
    how_it_works: Optional[str] = Field(None, min_length=1, max_length=10000, description="Vulnerability explanation")
    severity: Optional[str] = Field(None, description="Severity level")
    
    @validator('title')
    def validate_title(cls, v):
        """Validate and sanitize vulnerability title"""
        if v is None:
            return v
        return validate_vulnerability_title(v)
    
    @validator('payload')
    def validate_payload(cls, v):
        """Validate and sanitize payload"""
        if v is None:
            return v
        return validate_vulnerability_payload(v)
    
    @validator('how_it_works')
    def validate_how_it_works(cls, v):
        """Validate and sanitize how it works description"""
        if v is None:
            return v
        return validate_vulnerability_description(v)
    
    @validator('severity')
    def validate_severity(cls, v):
        """Validate severity level"""
        if v is None:
            return v
        return validate_severity(v)


class Vulnerability(BaseModel):
    id: str
    title: str
    payload: str
    how_it_works: str
    severity: str
    project_id: str
    user_id: str
    created_at: datetime
    updated_at: datetime


# Tool Models
class ToolScan(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tool_name: str
    target: str
    status: ToolStatus = ToolStatus.PENDING
    results: Optional[Dict[str, Any]] = None
    error_message: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ToolScanCreate(BaseModel):
    target: str


class ToolScanResponse(BaseModel):
    success: bool
    message: str
    results: Optional[Dict[str, Any]] = None
    error: Optional[str] = None


# Data conversion functions
def db_project_to_pydantic(db_project, targets: List = None) -> Project:
    """Convert database project to Pydantic model"""
    from services.security_service import _safe_json_loads
    
    return Project(
        id=db_project.id,
        name=db_project.name,
        description=db_project.description,
        status=db_project.status,
        start_date=db_project.start_date,
        end_date=db_project.end_date,
        team_members=_safe_json_loads(db_project.team_members, []),
        targets=targets or [],
        created_at=db_project.created_at,
        updated_at=db_project.updated_at
    )


def db_target_to_pydantic(db_target) -> Target:
    """Convert database target to Pydantic model"""
    return Target(
        id=db_target.id,
        target_type=db_target.target_type,
        value=db_target.value,
        description=db_target.description,
        is_in_scope=db_target.is_in_scope,
        created_at=db_target.created_at
    )


def db_note_to_pydantic(db_note) -> Note:
    """Convert database note to Pydantic model"""
    from services.security_service import _safe_json_loads
    
    return Note(
        id=db_note.id,
        title=db_note.title,
        content=db_note.content,
        tags=_safe_json_loads(db_note.tags, []),
        project_id=db_note.project_id,
        user_id=db_note.user_id,
        created_at=db_note.created_at,
        updated_at=db_note.updated_at
    )


def db_vulnerability_to_pydantic(db_vuln) -> Vulnerability:
    """Convert database vulnerability to Pydantic model"""
    return Vulnerability(
        id=db_vuln.id,
        title=db_vuln.title,
        payload=db_vuln.payload,
        how_it_works=db_vuln.how_it_works,
        severity=db_vuln.severity,
        project_id=db_vuln.project_id,
        user_id=db_vuln.user_id,
        created_at=db_vuln.created_at,
        updated_at=db_vuln.updated_at
    )
