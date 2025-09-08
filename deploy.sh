#!/bin/bash

# Google Cloud Build Deploy Script for PentoraSec API
# This script triggers a Cloud Build job to build and deploy the FastAPI application

set -e  # Exit on any error

# Configuration
PROJECT_ID="pentorasec"  # Your actual project ID
REGION="us-central1"
REPO_NAME="pentorasec-docker1"
SERVICE_NAME="pentorsec-api"
TRIGGER_NAME="pentorsec-api-trigger"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting PentoraSec API deployment...${NC}"

# Check if gcloud is installed and authenticated
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo -e "${YELLOW}⚠️  You are not authenticated. Please run: gcloud auth login${NC}"
    exit 1
fi

# Set the project
echo -e "${BLUE}📋 Setting project to: ${PROJECT_ID}${NC}"
gcloud config set project $PROJECT_ID

# Check if Artifact Registry repository exists, create if not
echo -e "${BLUE}🔍 Checking Artifact Registry repository...${NC}"
if ! gcloud artifacts repositories describe $REPO_NAME --location=$REGION &> /dev/null; then
    echo -e "${YELLOW}📦 Creating Artifact Registry repository: ${REPO_NAME}${NC}"
    gcloud artifacts repositories create $REPO_NAME \
        --repository-format=docker \
        --location=$REGION \
        --description="PentoraSec API Docker images"
else
    echo -e "${GREEN}✅ Artifact Registry repository exists${NC}"
fi

# Configure Docker to use gcloud as a credential helper
echo -e "${BLUE}🔐 Configuring Docker authentication...${NC}"
gcloud auth configure-docker ${REGION}-docker.pkg.dev

# Submit build to Cloud Build
echo -e "${BLUE}🏗️  Submitting build to Cloud Build...${NC}"
gcloud builds submit \
    --config=cloudbuild.yaml \
    --substitutions=_REGION=$REGION,_REPO_NAME=$REPO_NAME,_SERVICE_NAME=$SERVICE_NAME \
    --region=$REGION \
    .

# Get the service URL
echo -e "${BLUE}🔗 Getting Cloud Run service URL...${NC}"
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)")

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}🌐 Service URL: ${SERVICE_URL}${NC}"
echo -e "${GREEN}📊 Monitor your deployment at: https://console.cloud.google.com/run${NC}"

# Optional: Test the deployment
echo -e "${BLUE}🧪 Testing deployment...${NC}"
if curl -f -s "${SERVICE_URL}/health" > /dev/null; then
    echo -e "${GREEN}✅ Health check passed!${NC}"
else
    echo -e "${YELLOW}⚠️  Health check failed. Check the logs in Cloud Console.${NC}"
fi
