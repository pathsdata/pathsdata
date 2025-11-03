#!/bin/bash

# Deploy Vite App to AWS S3 + CloudFront
# Usage: ./deploy-to-aws.sh [environment] [terraform-dir]
#   environment: staging or production (default: staging)
#   terraform-dir: path to terraform environment directory (optional, will auto-detect)

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TERRAFORM_DIR="$SCRIPT_DIR/terraform"

# Verify Terraform directory exists
if [ ! -d "$TERRAFORM_DIR" ]; then
    echo -e "${RED}✗ Terraform directory not found: $TERRAFORM_DIR${NC}"
    exit 1
fi

echo -e "${BLUE}ℹ Using Terraform directory: $TERRAFORM_DIR${NC}"

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  Deploying to AWS - $ENVIRONMENT${NC}"
echo -e "${BLUE}======================================${NC}"
echo ""

# Step 1: Build the Vite app
echo -e "${YELLOW}Step 1: Building Vite app for $ENVIRONMENT...${NC}"
npm run build:$ENVIRONMENT

if [ ! -d "dist" ]; then
    echo -e "${RED}✗ Build failed - dist/ directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"
echo ""

# Step 2: Get infrastructure details from Terraform
echo -e "${YELLOW}Step 2: Getting infrastructure details from Terraform...${NC}"

cd "$TERRAFORM_DIR"

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo -e "${YELLOW}  Terraform not initialized. Running terraform init...${NC}"
    terraform init
fi

# Get outputs
BUCKET_NAME=$(terraform output -raw s3_bucket_name 2>/dev/null || echo "")
DISTRIBUTION_ID=$(terraform output -raw cloudfront_distribution_id 2>/dev/null || echo "")
CLOUDFRONT_URL=$(terraform output -raw cloudfront_url 2>/dev/null || echo "")

if [ -z "$BUCKET_NAME" ] || [ -z "$DISTRIBUTION_ID" ]; then
    echo -e "${RED}✗ Could not get Terraform outputs${NC}"
    echo -e "${YELLOW}  Make sure infrastructure is deployed: cd $TERRAFORM_DIR && terraform apply${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Infrastructure details retrieved:${NC}"
echo -e "  S3 Bucket: ${BLUE}$BUCKET_NAME${NC}"
echo -e "  CloudFront Distribution: ${BLUE}$DISTRIBUTION_ID${NC}"
echo -e "  CloudFront URL: ${BLUE}$CLOUDFRONT_URL${NC}"
echo ""

# Return to project directory
cd - > /dev/null

# Step 3: Sync files to S3
echo -e "${YELLOW}Step 3: Uploading files to S3...${NC}"

# Upload index.html with no-cache headers
echo -e "${BLUE}  Uploading index.html (no cache)...${NC}"
aws s3 cp dist/index.html "s3://$BUCKET_NAME/index.html" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE

# Upload vite.svg (favicon) with cache
if [ -f "dist/vite.svg" ]; then
    echo -e "${BLUE}  Uploading favicon...${NC}"
    aws s3 cp dist/vite.svg "s3://$BUCKET_NAME/vite.svg" \
        --cache-control "public, max-age=31536000" \
        --metadata-directive REPLACE
fi

# Upload assets with long cache duration
if [ -d "dist/assets" ]; then
    echo -e "${BLUE}  Uploading assets (1 year cache)...${NC}"
    aws s3 sync dist/assets "s3://$BUCKET_NAME/assets" \
        --cache-control "public, max-age=31536000, immutable" \
        --metadata-directive REPLACE \
        --delete
fi

# Sync any remaining files
echo -e "${BLUE}  Syncing remaining files...${NC}"
aws s3 sync dist "s3://$BUCKET_NAME" \
    --exclude "index.html" \
    --exclude "vite.svg" \
    --exclude "assets/*" \
    --cache-control "public, max-age=3600" \
    --metadata-directive REPLACE \
    --delete

echo -e "${GREEN}✓ Files uploaded successfully${NC}"
echo ""

# Step 4: Invalidate CloudFront cache
echo -e "${YELLOW}Step 4: Invalidating CloudFront cache...${NC}"

INVALIDATION_ID=$(aws cloudfront create-invalidation \
    --distribution-id "$DISTRIBUTION_ID" \
    --paths "/*" \
    --query 'Invalidation.Id' \
    --output text)

echo -e "${GREEN}✓ CloudFront invalidation created: $INVALIDATION_ID${NC}"
echo -e "${BLUE}  Waiting for invalidation to complete (this may take a few minutes)...${NC}"

# Wait for invalidation (optional - comment out if you don't want to wait)
aws cloudfront wait invalidation-completed \
    --distribution-id "$DISTRIBUTION_ID" \
    --id "$INVALIDATION_ID" 2>/dev/null || true

echo -e "${GREEN}✓ Cache invalidation completed${NC}"
echo ""

# Step 5: Summary
echo -e "${GREEN}======================================${NC}"
echo -e "${GREEN}  Deployment Complete!${NC}"
echo -e "${GREEN}======================================${NC}"
echo ""
echo -e "${BLUE}Your application is now live at:${NC}"
echo -e "${GREEN}$CLOUDFRONT_URL${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo -e "  1. Visit the URL above to test your application"
echo -e "  2. Verify API connectivity to the backend"
echo -e "  3. Test authentication flow"
echo ""
