"""
Tool execution routes for API endpoints.
This router contains all tool execution endpoints extracted from server.py
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any
import json
from datetime import datetime, timezone

from database import get_db
from dependencies import (
    check_subfinder_execution_permissions,
    check_amass_execution_permissions,
    check_nmap_execution_permissions,
    check_nuclei_execution_permissions,
    check_ffuf_execution_permissions,
    check_gobuster_execution_permissions,
    get_current_active_user
)
from services.tool_service import (
    run_subfinder,
    run_amass,
    run_nmap,
    run_nuclei,
    run_ffuf,
    run_gobuster,
    get_tools_status
)
from services.model_service import (
    ToolScanCreate,
    ToolScanResponse
)

router = APIRouter(prefix="/api", tags=["Tool Execution"])


@router.post("/tools/subfinder", response_model=ToolScanResponse)
async def run_subfinder_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_subfinder_execution_permissions),
    db: Session = Depends(get_db)
):
    """Run Subfinder tool for subdomain discovery"""
    try:
        user = auth_data["user"]
        print(f"🔧 Subfinder Debug: Starting scan for {scan_data.target} by user {user.id}")
        results = await run_subfinder(scan_data.target)
        print(f"🔧 Subfinder Debug: Scan completed, results: {results}")
        
        # Save tool output to database with user context
        from database import ToolOutput
        tool_output = ToolOutput(
            tool_name="subfinder",
            target=scan_data.target,
            output=json.dumps(results),
            user_id=user.id,
            project_id=scan_data.project_id,
            created_at=datetime.now(timezone.utc)
        )
        db.add(tool_output)
        db.commit()
        
        return ToolScanResponse(
            success=True,
            message="Subfinder scan completed successfully",
            results=results
        )
    except Exception as e:
        print(f"❌ Subfinder Debug: Error: {str(e)}")
        return ToolScanResponse(
            success=False,
            message="Subfinder scan failed",
            error=str(e)
        )


@router.post("/tools/amass", response_model=ToolScanResponse)
async def run_amass_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_amass_execution_permissions)
):
    """Run Amass tool for attack surface mapping"""
    try:
        results = await run_amass(scan_data.target)
        return ToolScanResponse(
            success=True,
            message="Amass scan completed successfully",
            results=results
        )
    except Exception as e:
        return ToolScanResponse(
            success=False,
            message="Amass scan failed",
            error=str(e)
        )


@router.post("/tools/nmap", response_model=ToolScanResponse)
async def run_nmap_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_nmap_execution_permissions)
):
    """Run Nmap tool for port scanning"""
    try:
        results = await run_nmap(scan_data.target)
        return ToolScanResponse(
            success=True,
            message="Nmap scan completed successfully",
            results=results
        )
    except Exception as e:
        return ToolScanResponse(
            success=False,
            message="Nmap scan failed",
            error=str(e)
        )


@router.post("/tools/nuclei", response_model=ToolScanResponse)
async def run_nuclei_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_nuclei_execution_permissions)
):
    """Run Nuclei tool for vulnerability scanning"""
    try:
        results = await run_nuclei(scan_data.target)
        return ToolScanResponse(
            success=True,
            message="Nuclei scan completed successfully",
            results=results
        )
    except Exception as e:
        return ToolScanResponse(
            success=False,
            message="Nuclei scan failed",
            error=str(e)
        )


@router.post("/tools/ffuf", response_model=ToolScanResponse)
async def run_ffuf_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_ffuf_execution_permissions)
):
    """Run ffuf tool for web fuzzing"""
    try:
        results = await run_ffuf(scan_data.target)
        return ToolScanResponse(
            success=True,
            message="ffuf scan completed successfully",
            results=results
        )
    except Exception as e:
        return ToolScanResponse(
            success=False,
            message="ffuf scan failed",
            error=str(e)
        )


@router.post("/tools/gobuster", response_model=ToolScanResponse)
async def run_gobuster_tool(
    scan_data: ToolScanCreate,
    auth_data: dict = Depends(check_gobuster_execution_permissions)
):
    """Run Gobuster tool for directory brute forcing"""
    try:
        results = await run_gobuster(scan_data.target)
        return ToolScanResponse(
            success=True,
            message="Gobuster scan completed successfully",
            results=results
        )
    except Exception as e:
        return ToolScanResponse(
            success=False,
            message="Gobuster scan failed",
            error=str(e)
        )


@router.get("/tools/status")
async def get_tools_status_endpoint():
    """Get status of all available tools"""
    return get_tools_status()


@router.get("/tools/outputs")
async def get_tool_outputs_endpoint(
    current_user = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all tool outputs for current user"""
    from database import ToolOutput
    
    # Get tool outputs for current user
    tool_outputs = db.query(ToolOutput).filter(
        ToolOutput.user_id == current_user.id
    ).order_by(ToolOutput.created_at.desc()).all()
    
    # Convert to response format
    outputs = []
    for output in tool_outputs:
        try:
            output_data = json.loads(output.output) if output.output else {}
        except json.JSONDecodeError:
            output_data = {"raw_output": output.output}
            
        outputs.append({
            "id": output.id,
            "tool_name": output.tool_name,
            "target": output.target,
            "output": output_data,
            "project_id": output.project_id,
            "created_at": output.created_at.isoformat()
        })
    
    return {
        "outputs": outputs,
        "count": len(outputs)
    }
