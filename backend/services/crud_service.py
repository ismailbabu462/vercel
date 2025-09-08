"""
CRUD service for database operations.
This service contains all database-related functions extracted from server.py
"""

import json
from typing import List, Optional, Dict, Any
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from database import (
    Project as DBProject, 
    User as DBUser, 
    Target as DBTarget, 
    Note as DBNote, 
    Vulnerability as DBVulnerability
)
from services.security_service import _safe_json_loads, sanitize_user_input_for_logging


# Project CRUD Operations
def create_project(project_data: dict, user_id: str, db: Session) -> DBProject:
    """Create a new project in the database"""
    # SECURITY: Safe logging - sanitize user input
    safe_user_id = sanitize_user_input_for_logging(user_id)
    print(f"🔧 Create Project Debug: User ID: {safe_user_id}")
    
    # Create project in SQLite
    db_project = DBProject(
        name=project_data["name"],
        description=project_data.get("description"),
        status=project_data.get("status", "planning"),
        start_date=project_data.get("start_date"),
        end_date=project_data.get("end_date"),
        team_members=json.dumps(project_data.get("team_members", [])) if project_data.get("team_members") else None,
        user_id=user_id
    )
    
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    
    print(f"🔧 Create Project Debug: SQLite insert result: {db_project.id}")
    return db_project


def get_projects_by_user(user_id: str, db: Session) -> List[DBProject]:
    """Get all projects for a specific user"""
    safe_user_id = sanitize_user_input_for_logging(user_id)
    print(f"🔍 Get Projects Debug: User ID: {safe_user_id}")
    
    db_projects = db.query(DBProject).filter(DBProject.user_id == user_id).all()
    print(f"🔍 Get Projects Debug: Found {len(db_projects)} projects in SQLite")
    
    return db_projects


def get_project_by_id(project_id: str, user_id: str, db: Session) -> Optional[DBProject]:
    """Get a specific project by ID for a user"""
    return db.query(DBProject).filter(
        DBProject.id == project_id,
        DBProject.user_id == user_id
    ).first()


def update_project(project_id: str, user_id: str, update_data: dict, db: Session) -> Optional[DBProject]:
    """Update a project"""
    db_project = db.query(DBProject).filter(
        DBProject.id == project_id,
        DBProject.user_id == user_id
    ).first()
    
    if not db_project:
        return None
    
    # Update project fields
    for field, value in update_data.items():
        if field == "team_members" and value is not None:
            setattr(db_project, field, json.dumps(value))
        else:
            setattr(db_project, field, value)
    
    db_project.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(db_project)
    
    return db_project


def delete_project(project_id: str, user_id: str, db: Session) -> bool:
    """Delete a project and all associated data"""
    db_project = db.query(DBProject).filter(
        DBProject.id == project_id,
        DBProject.user_id == user_id
    ).first()
    
    if not db_project:
        return False
    
    # Delete associated targets and notes first
    db.query(DBTarget).filter(DBTarget.project_id == project_id).delete()
    db.query(DBNote).filter(DBNote.project_id == project_id).delete()
    db.query(DBVulnerability).filter(DBVulnerability.project_id == project_id).delete()
    
    # Delete the project
    db.delete(db_project)
    db.commit()
    
    return True


# Target CRUD Operations
def create_target(project_id: str, target_data: dict, db: Session) -> DBTarget:
    """Create a new target for a project"""
    db_target = DBTarget(
        target_type=target_data["target_type"],
        value=target_data["value"],
        description=target_data.get("description"),
        is_in_scope=target_data.get("is_in_scope", True),
        project_id=project_id
    )
    
    db.add(db_target)
    db.commit()
    db.refresh(db_target)
    
    return db_target


def get_targets_by_project(project_id: str, db: Session) -> List[DBTarget]:
    """Get all targets for a project"""
    return db.query(DBTarget).filter(DBTarget.project_id == project_id).all()


def delete_target(target_id: str, project_id: str, db: Session) -> bool:
    """Delete a target from a project"""
    target = db.query(DBTarget).filter(
        DBTarget.id == target_id, 
        DBTarget.project_id == project_id
    ).first()
    
    if not target:
        return False
    
    db.delete(target)
    db.commit()
    return True


# Note CRUD Operations
def create_note(note_data: dict, user_id: str, db: Session) -> DBNote:
    """Create a new note"""
    db_note = DBNote(
        title=note_data["title"],
        content=note_data["content"],
        tags=json.dumps(note_data.get("tags", [])) if note_data.get("tags") else None,
        project_id=note_data["project_id"],
        user_id=user_id
    )
    
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    
    return db_note


def get_notes_by_project(project_id: str, user_id: str, db: Session) -> List[DBNote]:
    """Get all notes for a project by a specific user"""
    return db.query(DBNote).filter(
        DBNote.project_id == project_id,
        DBNote.user_id == user_id
    ).all()


def get_note_by_id(note_id: str, user_id: str, db: Session) -> Optional[DBNote]:
    """Get a specific note by ID for a user"""
    return db.query(DBNote).filter(
        DBNote.id == note_id,
        DBNote.user_id == user_id
    ).first()


def update_note(note_id: str, user_id: str, update_data: dict, db: Session) -> Optional[DBNote]:
    """Update a note"""
    note = db.query(DBNote).filter(
        DBNote.id == note_id,
        DBNote.user_id == user_id
    ).first()
    
    if not note:
        return None
    
    # Update note fields
    for field, value in update_data.items():
        if field == "tags" and value is not None:
            setattr(note, field, json.dumps(value))
        else:
            setattr(note, field, value)
    
    note.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(note)
    
    return note


def delete_note(note_id: str, user_id: str, db: Session) -> bool:
    """Delete a note"""
    note = db.query(DBNote).filter(
        DBNote.id == note_id,
        DBNote.user_id == user_id
    ).first()
    
    if not note:
        return False
    
    db.delete(note)
    db.commit()
    return True


# Vulnerability CRUD Operations
def create_vulnerability(project_id: str, user_id: str, vuln_data: dict, db: Session) -> DBVulnerability:
    """Create a new vulnerability"""
    db_vuln = DBVulnerability(
        title=vuln_data["title"],
        payload=vuln_data["payload"],
        how_it_works=vuln_data["how_it_works"],
        severity=vuln_data["severity"],
        project_id=project_id,
        user_id=user_id
    )
    
    db.add(db_vuln)
    db.commit()
    db.refresh(db_vuln)
    
    return db_vuln


def get_vulnerabilities_by_project(project_id: str, db: Session) -> List[DBVulnerability]:
    """Get all vulnerabilities for a project"""
    return db.query(DBVulnerability).filter(
        DBVulnerability.project_id == project_id
    ).order_by(DBVulnerability.created_at.desc()).all()


def get_vulnerability_by_id(vuln_id: str, user_id: str, db: Session) -> Optional[DBVulnerability]:
    """Get a specific vulnerability by ID for a user"""
    return db.query(DBVulnerability).filter(
        DBVulnerability.id == vuln_id,
        DBVulnerability.user_id == user_id
    ).first()


def update_vulnerability(vuln_id: str, user_id: str, update_data: dict, db: Session) -> Optional[DBVulnerability]:
    """Update a vulnerability"""
    vuln = db.query(DBVulnerability).filter(
        DBVulnerability.id == vuln_id,
        DBVulnerability.user_id == user_id
    ).first()
    
    if not vuln:
        return None
    
    # Update fields if provided
    for field, value in update_data.items():
        if value is not None:
            setattr(vuln, field, value)
    
    vuln.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(vuln)
    
    return vuln


def delete_vulnerability(vuln_id: str, user_id: str, db: Session) -> bool:
    """Delete a vulnerability"""
    vuln = db.query(DBVulnerability).filter(
        DBVulnerability.id == vuln_id,
        DBVulnerability.user_id == user_id
    ).first()
    
    if not vuln:
        return False
    
    db.delete(vuln)
    db.commit()
    return True


# Dashboard Statistics
def get_dashboard_stats(user_id: str, db: Session) -> Dict[str, Any]:
    """Get dashboard statistics for specific user"""
    total_projects = db.query(DBProject).filter(DBProject.user_id == user_id).count()
    active_projects = db.query(DBProject).filter(
        DBProject.user_id == user_id,
        DBProject.status == "active"
    ).count()
    total_notes = db.query(DBNote).filter(DBNote.user_id == user_id).count()
    
    # Get recent projects for this user
    recent_db_projects = db.query(DBProject).filter(
        DBProject.user_id == user_id
    ).order_by(DBProject.updated_at.desc()).limit(5).all()
    
    return {
        "total_projects": total_projects,
        "active_projects": active_projects,
        "total_notes": total_notes,
        "recent_projects": recent_db_projects
    }
