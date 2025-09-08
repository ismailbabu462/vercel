"""
Tool execution routes for API endpoints.
This router contains all tool execution endpoints extracted from server.py
"""

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Dict, Any

from database import get_db
from dependencies import (
    check_subfinder_execution_permissions,
    check_amass_execution_permissions,
    check_nmap_execution_permissions,
    check_nuclei_execution_permissions,
    check_ffuf_execution_permissions,
    check_gobuster_execution_permissions
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
    auth_data: dict = Depends(check_subfinder_execution_permissions)
):
    """Run Subfinder tool for subdomain discovery"""
    try:
        print(f"🔧 Subfinder Debug: Starting scan for {scan_data.target}")
        results = await run_subfinder(scan_data.target)
        print(f"🔧 Subfinder Debug: Scan completed, results: {results}")
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
