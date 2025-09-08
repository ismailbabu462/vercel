"""
Project routes for API endpoints.
This router contains all project-related endpoints extracted from server.py
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from dependencies import (
    check_project_creation_permissions,
    check_collaboration_permissions,
    get_current_active_user
)
from services.crud_service import (
    create_project,
    get_projects_by_user,
    get_project_by_id,
    update_project,
    delete_project,
    create_target,
    get_targets_by_project,
    delete_target
)
from services.model_service import (
    Project,
    ProjectCreate,
    ProjectUpdate,
    Target,
    TargetCreate,
    ProjectInviteCreate,
    db_project_to_pydantic,
    db_target_to_pydantic
)

router = APIRouter(prefix="/api", tags=["Projects"])


@router.post("/projects", response_model=Project)
async def create_project_endpoint(
    project_data: ProjectCreate,
    auth_data: dict = Depends(check_project_creation_permissions),
    db: Session = Depends(get_db)
):
    """Create a new project"""
    # Extract user from auth_data
    current_user = auth_data["user"]
    
    # Create project using service
    db_project = create_project(project_data.dict(), current_user.id, db)
    
    # Convert to Pydantic model for response
    return db_project_to_pydantic(db_project, [])


@router.get("/projects", response_model=List[Project])
async def get_projects_endpoint(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all projects for the current user"""
    # Get projects using service
    db_projects = get_projects_by_user(current_user.id, db)
    
    projects = []
    for db_project in db_projects:
        # Get targets for this project
        targets = get_targets_by_project(db_project.id, db)
        target_objects = [db_target_to_pydantic(target) for target in targets]
        
        project_obj = db_project_to_pydantic(db_project, target_objects)
        projects.append(project_obj)
    
    return projects


@router.get("/projects/{project_id}", response_model=Project)
async def get_project_endpoint(
    project_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific project by ID"""
    # Get project using service
    db_project = get_project_by_id(project_id, current_user.id, db)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Get targets for this project
    targets = get_targets_by_project(db_project.id, db)
    target_objects = [db_target_to_pydantic(target) for target in targets]
    
    return db_project_to_pydantic(db_project, target_objects)


@router.put("/projects/{project_id}", response_model=Project)
async def update_project_endpoint(
    project_id: str, 
    project_update: ProjectUpdate, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a project"""
    # Update project using service
    db_project = update_project(project_id, current_user.id, project_update.dict(exclude_unset=True), db)
    if not db_project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Get targets for this project
    targets = get_targets_by_project(db_project.id, db)
    target_objects = [db_target_to_pydantic(target) for target in targets]
    
    return db_project_to_pydantic(db_project, target_objects)


@router.delete("/projects/{project_id}")
async def delete_project_endpoint(
    project_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a project"""
    # Delete project using service
    success = delete_project(project_id, current_user.id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return {"message": "Project deleted successfully"}


@router.post("/projects/{project_id}/invite")
async def invite_user_to_project_endpoint(
    project_id: str,
    invite_data: ProjectInviteCreate,
    auth_data: dict = Depends(check_collaboration_permissions),
    db: Session = Depends(get_db)
):
    """Invite a user to collaborate on a project (Premium feature)"""
    # Extract user from auth_data
    current_user = auth_data["user"]
    
    # Check if project exists and user owns it
    db_project = get_project_by_id(project_id, current_user.id, db)
    if not db_project:
        raise HTTPException(
            status_code=404,
            detail="Project not found or access denied"
        )
    
    # For now, just return success (in real implementation, you'd send email invite)
    return {
        "message": f"Invitation sent to {invite_data.email} for role: {invite_data.role}",
        "project_id": project_id,
        "invited_email": invite_data.email,
        "role": invite_data.role
    }


# Target Routes
@router.post("/projects/{project_id}/targets", response_model=Target)
async def add_target_to_project_endpoint(
    project_id: str, 
    target_data: TargetCreate, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Add a target to a project"""
    # Check if project exists and belongs to current user
    project = get_project_by_id(project_id, current_user.id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Create target using service
    db_target = create_target(project_id, target_data.dict(), db)
    
    return db_target_to_pydantic(db_target)


@router.get("/projects/{project_id}/targets", response_model=List[Target])
async def get_project_targets_endpoint(
    project_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all targets for a project"""
    # Check if project exists and belongs to current user
    project = get_project_by_id(project_id, current_user.id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Get targets using service
    targets = get_targets_by_project(project_id, db)
    return [db_target_to_pydantic(target) for target in targets]


@router.delete("/projects/{project_id}/targets/{target_id}")
async def remove_target_from_project_endpoint(
    project_id: str, 
    target_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Remove a target from a project"""
    # Check if project exists and belongs to current user
    project = get_project_by_id(project_id, current_user.id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Delete target using service
    success = delete_target(target_id, project_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Target not found")
    
    return {"message": "Target removed successfully"}
