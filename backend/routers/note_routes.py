"""
Note routes for API endpoints.
This router contains all note-related endpoints extracted from server.py
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from dependencies import get_current_active_user
from services.crud_service import (
    create_note,
    get_notes_by_project,
    get_note_by_id,
    update_note,
    delete_note
)
from services.model_service import (
    Note,
    NoteCreate,
    NoteUpdate,
    db_note_to_pydantic
)

router = APIRouter(prefix="/api", tags=["Notes"])


@router.post("/notes", response_model=Note)
async def create_note_endpoint(
    note_data: NoteCreate, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new note"""
    # Verify project exists and belongs to current user
    from services.crud_service import get_project_by_id
    project = get_project_by_id(note_data.project_id, current_user.id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Create note using service
    db_note = create_note(note_data.dict(), current_user.id, db)
    
    return db_note_to_pydantic(db_note)


@router.get("/projects/{project_id}/notes", response_model=List[Note])
async def get_project_notes_endpoint(
    project_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all notes for a project"""
    # Verify project belongs to current user
    from services.crud_service import get_project_by_id
    project = get_project_by_id(project_id, current_user.id, db)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Get notes using service
    notes = get_notes_by_project(project_id, current_user.id, db)
    return [db_note_to_pydantic(note) for note in notes]


@router.get("/notes/{note_id}", response_model=Note)
async def get_note_endpoint(
    note_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific note by ID"""
    # Get note using service
    note = get_note_by_id(note_id, current_user.id, db)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return db_note_to_pydantic(note)


@router.put("/notes/{note_id}", response_model=Note)
async def update_note_endpoint(
    note_id: str, 
    note_update: NoteUpdate, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a note"""
    # Update note using service
    note = update_note(note_id, current_user.id, note_update.dict(exclude_unset=True), db)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return db_note_to_pydantic(note)


@router.delete("/notes/{note_id}")
async def delete_note_endpoint(
    note_id: str, 
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a note"""
    # Delete note using service
    success = delete_note(note_id, current_user.id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Note not found")
    
    return {"message": "Note deleted successfully"}
