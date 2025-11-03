terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.70"
    }
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "PathsData"
      Component   = "Frontend"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

locals {
  bucket_name = "${var.project_name}-${var.environment}-frontend"

  common_tags = {
    Project     = var.project_name
    Component   = "Frontend"
    Environment = var.environment
    ManagedBy   = "Terraform"
  }
}

# CloudFront Static Site Module
module "frontend" {
  source = "./modules/cloudfront-static-site"

  bucket_name            = local.bucket_name
  environment            = var.environment
  enable_versioning      = var.enable_versioning
  cloudfront_price_class = var.cloudfront_price_class

  tags = local.common_tags
}
