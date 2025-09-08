#!/bin/bash

# Google Cloud Build Trigger Setup Script
# This script creates a Cloud Build trigger for automatic deployments

set -e  # Exit on any error

# Configuration
PROJECT_ID="pentorasec"  # Your actual project ID
REGION="us-central1"
REPO_NAME="pentorasec-docker1"
SERVICE_NAME="pentorsec-api"
TRIGGER_NAME="pentorsec-api-trigger"
GITHUB_REPO="your-username/pentorsec-repo"  # Replace with your GitHub repo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Setting up Cloud Build trigger for PentoraSec API...${NC}"

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Set the project
echo -e "${BLUE}📋 Setting project to: ${PROJECT_ID}${NC}"
gcloud config set project $PROJECT_ID

# Enable required APIs
echo -e "${BLUE}🔌 Enabling required APIs...${NC}"
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable secretmanager.googleapis.com

# Create Cloud Build trigger
echo -e "${BLUE}🎯 Creating Cloud Build trigger...${NC}"
gcloud builds triggers create github \
    --repo-name=$GITHUB_REPO \
    --repo-owner=$(echo $GITHUB_REPO | cut -d'/' -f1) \
    --branch-pattern="^main$" \
    --build-config="cloudbuild.yaml" \
    --name=$TRIGGER_NAME \
    --description="Automatic deployment of PentoraSec API to Cloud Run" \
    --substitutions="_REGION=$REGION,_REPO_NAME=$REPO_NAME,_SERVICE_NAME=$SERVICE_NAME"

echo -e "${GREEN}✅ Cloud Build trigger created successfully!${NC}"
echo -e "${GREEN}🔗 View triggers at: https://console.cloud.google.com/cloud-build/triggers${NC}"

# Create secrets in Secret Manager (optional)
echo -e "${BLUE}🔐 Setting up secrets in Secret Manager...${NC}"
echo -e "${YELLOW}⚠️  You need to manually create these secrets in Secret Manager:${NC}"
echo -e "${YELLOW}   - JWT_SECRET_KEY${NC}"
echo -e "${YELLOW}   - MYSQL_DATABASE_URL${NC}"
echo -e "${YELLOW}   - GEMINI_API_KEY${NC}"
echo -e "${YELLOW}   - LEMONSQUEEZY_WEBHOOK_SECRET${NC}"
echo -e "${YELLOW}   Use: gcloud secrets create SECRET_NAME --data-file=-${NC}"

echo -e "${GREEN}🎉 Setup completed! Your API will now deploy automatically on every push to main branch.${NC}"
