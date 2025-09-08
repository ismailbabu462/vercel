"""
Main FastAPI application server.
This is the refactored, clean version that only handles app initialization and router inclusion.
"""

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi import HTTPException
from starlette.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import logging
from pathlib import Path

# Import security headers middleware
from middleware.security_headers import SecurityHeadersMiddleware
from middleware.rate_limiting import RateLimitMiddleware

# Import config and database
from config import CORS_ORIGINS
from database import init_db

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Initialize database with error handling
try:
    init_db()
except Exception as e:
    print(f"❌ Database initialization failed: {e}")
    print("🔄 This might be due to database not being ready yet. The application will retry on first request.")

# Create the main app with proper docs configuration
app = FastAPI(
    title="Emergent Pentest Suite API", 
    version="1.0.0",
    description="A comprehensive penetration testing management platform",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)

# Import routers
try:
    from .routers import (
        keys as keys_router_module,
        payments as payments_router_module,
        auth as auth_router_module,
        ai as ai_router_module,
        tools as tools_router_module,
        vulnerabilities as vulnerabilities_router_module,
        project_routes as project_router_module,
        note_routes as note_router_module,
        vulnerability_routes as vulnerability_router_module,
        tool_execution_routes as tool_execution_router_module,
        dashboard_routes as dashboard_router_module
    )
except Exception:
    # Fallback for direct execution without package context
    import routers.keys as keys_router_module  # type: ignore
    import routers.payments as payments_router_module  # type: ignore
    import routers.auth as auth_router_module  # type: ignore
    import routers.ai as ai_router_module  # type: ignore
    import routers.tools as tools_router_module  # type: ignore
    import routers.vulnerabilities as vulnerabilities_router_module  # type: ignore
    import routers.project_routes as project_router_module  # type: ignore
    import routers.note_routes as note_router_module  # type: ignore
    import routers.vulnerability_routes as vulnerability_router_module  # type: ignore
    import routers.tool_execution_routes as tool_execution_router_module  # type: ignore
    import routers.dashboard_routes as dashboard_router_module  # type: ignore

# Include all routers
app.include_router(keys_router_module.router)
app.include_router(payments_router_module.router)
app.include_router(auth_router_module.router)
app.include_router(ai_router_module.router)
app.include_router(tools_router_module.router)
app.include_router(vulnerabilities_router_module.router)
app.include_router(project_router_module.router)
app.include_router(note_router_module.router)
app.include_router(vulnerability_router_module.router)
app.include_router(tool_execution_router_module.router)
app.include_router(dashboard_router_module.router)

# Health check endpoints
@app.get("/")
async def root():
    return {"message": "Emergent Pentest Suite API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    from datetime import datetime, timezone
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Swagger UI endpoint for debugging
@app.get("/api-docs")
async def api_docs():
    """Redirect to Swagger UI"""
    from fastapi.responses import RedirectResponse
    return RedirectResponse(url="/docs")

# CORS configuration
origins = os.getenv("CORS_ORIGINS", CORS_ORIGINS).split(',')

# Add CORS middleware with comprehensive settings
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],  # Allow all origins for Swagger UI
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Add rate limiting middleware (before security headers)
app.add_middleware(RateLimitMiddleware, default_limit=100, window_seconds=60)

# Add security headers middleware (after CORS middleware)
app.add_middleware(SecurityHeadersMiddleware)

# Mount static files for frontend
static_dir = ROOT_DIR / "static"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Frontend routing - catch all routes for SPA
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    """Serve frontend files and handle SPA routing"""
    # Skip API routes
    if full_path.startswith("api/"):
        raise HTTPException(status_code=404, detail="API endpoint not found")
    
    # Serve static files
    static_file_path = static_dir / full_path
    if static_dir.exists() and static_file_path.exists() and static_file_path.is_file():
        return FileResponse(str(static_file_path))
    
    # For SPA, always serve index.html
    index_file = static_dir / "index.html"
    if static_dir.exists() and index_file.exists():
        return FileResponse(str(index_file))
    
    # Fallback
    raise HTTPException(status_code=404, detail="File not found")

@app.on_event("shutdown")
async def shutdown_db_client():
    # SQLite doesn't need explicit connection closing
    pass
