"""
Dashboard routes for API endpoints.
This router contains all dashboard-related endpoints extracted from server.py
"""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from services.crud_service import get_dashboard_stats
from services.model_service import (
    Project,
    db_project_to_pydantic,
    db_target_to_pydantic
)

router = APIRouter(prefix="/api", tags=["Dashboard"])


@router.get("/dashboard/stats")
async def get_dashboard_stats_endpoint(db: Session = Depends(get_db)):
    """Get dashboard statistics"""
    # Get stats using service
    stats = get_dashboard_stats(db)
    
    # Convert recent projects to Pydantic models
    recent_projects = []
    for db_project in stats["recent_projects"]:
        # Get targets for this project
        from services.crud_service import get_targets_by_project
        targets = get_targets_by_project(db_project.id, db)
        target_objects = [db_target_to_pydantic(target) for target in targets]
        
        project_obj = db_project_to_pydantic(db_project, target_objects)
        recent_projects.append(project_obj)
    
    return {
        "total_projects": stats["total_projects"],
        "active_projects": stats["active_projects"],
        "total_notes": stats["total_notes"],
        "recent_projects": recent_projects
    }
