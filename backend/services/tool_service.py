"""
Tool service for pentesting tool execution.
This service contains all tool-related functions extracted from server.py
"""

import subprocess
import json
import re
import time
from typing import Dict, Any
from datetime import datetime, timezone
from enum import Enum


class ToolStatus(str, Enum):
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    PENDING = "pending"


async def run_subfinder(target: str) -> Dict[str, Any]:
    """Run Subfinder tool for subdomain discovery"""
    try:
        # Clean target (remove protocol and www)
        clean_target = re.sub(r'^https?://', '', target)
        clean_target = re.sub(r'^www\.', '', clean_target)
        
        # Simulate real subdomain discovery
        time.sleep(2)  # Simulate scan time
        
        # Return mock results for now
        subdomains = [
            f"www.{clean_target}",
            f"mail.{clean_target}",
            f"admin.{clean_target}",
            f"api.{clean_target}",
            f"dev.{clean_target}"
        ]
        
        return {
            "subdomains": subdomains,
            "count": len(subdomains),
            "tool_version": "subfinder_mock",
            "execution_time": "2s"
        }
        
    except Exception as e:
        raise Exception(f"Subdomain discovery failed: {str(e)}")


async def run_amass(target: str) -> Dict[str, Any]:
    """Run Amass tool for attack surface mapping"""
    try:
        # Clean target
        clean_target = re.sub(r'^https?://', '', target)
        clean_target = re.sub(r'^www\.', '', clean_target)
        
        # Simulate real attack surface mapping
        time.sleep(3)  # Simulate scan time
        
        # Return mock results for now
        subdomains = [
            f"https://{clean_target}/admin",
            f"https://{clean_target}/api",
            f"https://{clean_target}/backup",
            f"https://{clean_target}/config",
            f"https://{clean_target}/test"
        ]
        
        return {
            "subdomains": subdomains,
            "count": len(subdomains),
            "tool_version": "amass_mock",
            "execution_time": "3s"
        }
        
    except Exception as e:
        raise Exception(f"Attack surface mapping failed: {str(e)}")


async def run_nmap(target: str) -> Dict[str, Any]:
    """Run Nmap tool for port scanning"""
    try:
        # Clean target
        clean_target = re.sub(r'^https?://', '', target)
        clean_target = re.sub(r'^www\.', '', clean_target)
        
        # Run nmap from tools container
        result = subprocess.run(
            ['nmap', '-sS', '-sV', '-O', '-p', '21,22,23,25,53,80,110,143,443,993,995,3306,3389,5432,8080,8443', clean_target],
            capture_output=True,
            text=True,
            timeout=300  # 5 minutes timeout
        )
        
        if result.returncode == 0 and result.stdout.strip():
            # Parse nmap output
            open_ports = []
            services = {}
            
            for line in result.stdout.strip().split('\n'):
                if 'open' in line and 'tcp' in line:
                    parts = line.split()
                    if len(parts) >= 3:
                        port = int(parts[0].split('/')[0])
                        service = parts[2] if len(parts) > 2 else 'Unknown'
                        open_ports.append(port)
                        services[port] = service
            
            return {
                "open_ports": open_ports,
                "services": services,
                "total_ports_scanned": 17,
                "tool_version": "nmap",
                "execution_time": "real"
            }
        else:
            # If nmap fails, return empty results
            return {
                "open_ports": [],
                "services": {},
                "total_ports_scanned": 17,
                "tool_version": "nmap",
                "execution_time": "real",
                "error": result.stderr if result.stderr else "No open ports found"
            }
        
    except FileNotFoundError:
        raise Exception("Nmap tool not found. Please ensure tools container is running.")
    except subprocess.TimeoutExpired:
        raise Exception("Nmap scan timed out after 5 minutes.")
    except Exception as e:
        raise Exception(f"Nmap execution failed: {str(e)}")


async def run_nuclei(target: str) -> Dict[str, Any]:
    """Run Nuclei tool for vulnerability scanning"""
    try:
        # Clean target
        clean_target = re.sub(r'^https?://', '', target)
        if not clean_target.startswith('http'):
            clean_target = f"https://{clean_target}"
        
        # Try to use real nuclei first
        try:
            result = subprocess.run(
                ['nuclei', '-u', clean_target, '-silent', '-json', '-o', '/tmp/nuclei_output.json'],
                capture_output=True,
                text=True,
                timeout=600  # 10 minutes timeout
            )
            
            if result.returncode == 0:
                # Read nuclei output
                try:
                    with open('/tmp/nuclei_output.json', 'r') as f:
                        vulnerabilities = []
                        for line in f:
                            if line.strip():
                                try:
                                    vuln_data = json.loads(line.strip())
                                    vulnerabilities.append({
                                        "severity": vuln_data.get('info', {}).get('severity', 'medium'),
                                        "template": vuln_data.get('template_id', 'nuclei'),
                                        "description": vuln_data.get('info', {}).get('description', 'Vulnerability found'),
                                        "cve": vuln_data.get('info', {}).get('classification', {}).get('cve_id', []),
                                        "url": vuln_data.get('matched_at', clean_target)
                                    })
                                except json.JSONDecodeError:
                                    continue
                    
                    return {
                        "vulnerabilities": vulnerabilities,
                        "count": len(vulnerabilities),
                        "tool_version": "nuclei",
                        "execution_time": "real"
                    }
                except FileNotFoundError:
                    pass
        except FileNotFoundError:
            pass
        
        # Fallback to nikto for vulnerability scanning
        result = subprocess.run(
            ['nikto', '-h', clean_target, '-Format', 'txt'],
            capture_output=True,
            text=True,
            timeout=600  # 10 minutes timeout
        )
        
        if result.returncode == 0 and result.stdout.strip():
            # Parse nikto output
            vulnerabilities = []
            for line in result.stdout.strip().split('\n'):
                if ':' in line and ('VULNERABLE' in line or 'WARNING' in line):
                    vulnerabilities.append({
                        "severity": "medium" if 'WARNING' in line else "high",
                        "template": "nikto",
                        "description": line.strip(),
                        "cve": [],
                        "url": clean_target
                    })
            
            return {
                "vulnerabilities": vulnerabilities,
                "count": len(vulnerabilities),
                "tool_version": "nikto_fallback",
                "execution_time": "real"
            }
        else:
            # If both fail, return empty results
            return {
                "vulnerabilities": [],
                "count": 0,
                "tool_version": "none",
                "execution_time": "real",
                "error": result.stderr if result.stderr else "No vulnerabilities found"
            }
        
    except FileNotFoundError:
        raise Exception("Nikto tool not found. Please ensure tools container is running.")
    except subprocess.TimeoutExpired:
        raise Exception("Nikto scan timed out after 10 minutes.")
    except Exception as e:
        raise Exception(f"Nikto execution failed: {str(e)}")


async def run_ffuf(target: str) -> Dict[str, Any]:
    """Run ffuf tool for web fuzzing"""
    try:
        # Clean target
        clean_target = re.sub(r'^https?://', '', target)
        if not clean_target.startswith('http'):
            clean_target = f"https://{clean_target}"
        
        # Try to use real ffuf first
        try:
            result = subprocess.run(
                ['ffuf', '-u', f"{clean_target}/FUZZ", '-w', '/usr/share/wordlists/common.txt', '-o', '/tmp/ffuf_output.json', '-of', 'json'],
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes timeout
            )
            
            if result.returncode == 0:
                # Read ffuf output
                try:
                    with open('/tmp/ffuf_output.json', 'r') as f:
                        ffuf_data = json.load(f)
                        directories = []
                        for result_item in ffuf_data.get('results', []):
                            if result_item.get('status') in [200, 301, 302, 403]:
                                directories.append(result_item.get('url', ''))
                    
                    return {
                        "directories": directories,
                        "count": len(directories),
                        "tool_version": "ffuf",
                        "execution_time": "real"
                    }
                except (FileNotFoundError, json.JSONDecodeError):
                    pass
        except FileNotFoundError:
            pass
        
        # Fallback to dirb for directory fuzzing
        result = subprocess.run(
            ['dirb', clean_target, '/usr/share/wordlists/common.txt'],
            capture_output=True,
            text=True,
            timeout=300  # 5 minutes timeout
        )
        
        if result.returncode == 0 and result.stdout.strip():
            # Parse dirb output
            directories = []
            for line in result.stdout.strip().split('\n'):
                if 'DIRB' in line and 'CODE:' in line:
                    parts = line.split()
                    if len(parts) >= 2:
                        path = parts[1]
                        if path.startswith('/'):
                            directories.append(path)
            
            return {
                "directories": directories,
                "count": len(directories),
                "tool_version": "dirb_fallback",
                "execution_time": "real"
            }
        else:
            # If both fail, return empty results
            return {
                "directories": [],
                "count": 0,
                "tool_version": "none",
                "execution_time": "real",
                "error": result.stderr if result.stderr else "No directories found"
            }
        
    except subprocess.TimeoutExpired:
        raise Exception("Web fuzzing timed out after 5 minutes.")
    except Exception as e:
        raise Exception(f"Web fuzzing failed: {str(e)}")


async def run_gobuster(target: str) -> Dict[str, Any]:
    """Run Gobuster tool for directory brute forcing"""
    try:
        # Clean target
        clean_target = re.sub(r'^https?://', '', target)
        if not clean_target.startswith('http'):
            clean_target = f"https://{clean_target}"
        
        # Try to use real gobuster first
        try:
            result = subprocess.run(
                ['gobuster', 'dir', '-u', clean_target, '-w', '/usr/share/wordlists/common.txt', '-o', '/tmp/gobuster_output.txt'],
                capture_output=True,
                text=True,
                timeout=300  # 5 minutes timeout
            )
            
            if result.returncode == 0:
                # Read gobuster output
                try:
                    with open('/tmp/gobuster_output.txt', 'r') as f:
                        directories = []
                        for line in f:
                            if line.strip() and 'Status:' in line:
                                parts = line.split()
                                if len(parts) >= 2:
                                    path = parts[0]
                                    if path.startswith('/'):
                                        directories.append(path)
                    
                    return {
                        "directories": directories,
                        "count": len(directories),
                        "tool_version": "gobuster",
                        "execution_time": "real"
                    }
                except FileNotFoundError:
                    pass
        except FileNotFoundError:
            pass
        
        # Fallback to dirb for directory brute forcing
        result = subprocess.run(
            ['dirb', clean_target, '/usr/share/wordlists/common.txt'],
            capture_output=True,
            text=True,
            timeout=300  # 5 minutes timeout
        )
        
        if result.returncode == 0 and result.stdout.strip():
            # Parse dirb output
            directories = []
            for line in result.stdout.strip().split('\n'):
                if 'DIRB' in line and 'CODE:' in line:
                    parts = line.split()
                    if len(parts) >= 2:
                        path = parts[1]
                        if path.startswith('/'):
                            directories.append(path)
            
            return {
                "directories": directories,
                "count": len(directories),
                "tool_version": "dirb_fallback",
                "execution_time": "real"
            }
        else:
            # If both fail, return empty results
            return {
                "directories": [],
                "count": 0,
                "tool_version": "none",
                "execution_time": "real",
                "error": result.stderr if result.stderr else "No directories found"
            }
        
    except subprocess.TimeoutExpired:
        raise Exception("Directory brute forcing timed out after 5 minutes.")
    except Exception as e:
        raise Exception(f"Directory brute forcing failed: {str(e)}")


def get_tools_status() -> Dict[str, Any]:
    """Get status of all available tools"""
    tools_status = {
        "subfinder": {
            "name": "Subfinder",
            "status": "available",
            "description": "Fast passive subdomain discovery tool",
            "version": "latest"
        },
        "amass": {
            "name": "Amass",
            "status": "available",
            "description": "In-depth attack surface mapping",
            "version": "latest"
        },
        "nmap": {
            "name": "Nmap",
            "status": "available",
            "description": "Network discovery and port scanning",
            "version": "latest"
        },
        "nuclei": {
            "name": "Nuclei",
            "status": "available",
            "description": "Fast vulnerability scanner",
            "version": "latest"
        },
        "ffuf": {
            "name": "ffuf",
            "status": "available",
            "description": "Fast web fuzzer",
            "version": "latest"
        },
        "gobuster": {
            "name": "Gobuster",
            "status": "available",
            "description": "Directory and file brute-forcer",
            "version": "latest"
        }
    }
    
    # Check if tools are actually available on the system
    for tool_name in tools_status:
        try:
            if tool_name == "subfinder":
                subprocess.run(['subfinder', '-version'], capture_output=True, timeout=5)
            elif tool_name == "amass":
                subprocess.run(['amass', '-version'], capture_output=True, timeout=5)
            elif tool_name == "nmap":
                subprocess.run(['nmap', '-V'], capture_output=True, timeout=5)
            elif tool_name == "nuclei":
                subprocess.run(['nuclei', '-version'], capture_output=True, timeout=5)
            elif tool_name == "ffuf":
                subprocess.run(['ffuf', '-V'], capture_output=True, timeout=5)
            elif tool_name == "gobuster":
                subprocess.run(['gobuster', 'version'], capture_output=True, timeout=5)
            
            tools_status[tool_name]["status"] = "available"
        except (FileNotFoundError, subprocess.TimeoutExpired):
            tools_status[tool_name]["status"] = "mock_only"
    
    return tools_status
