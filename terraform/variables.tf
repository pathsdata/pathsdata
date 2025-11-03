# Variables for PathsData Frontend Infrastructure

variable "aws_region" {
  description = "AWS region for deploying resources"
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "pathsdata"
}

variable "environment" {
  description = "Environment name (staging, production, etc.)"
  type        = string
}

variable "enable_versioning" {
  description = "Enable S3 bucket versioning for rollback capability"
  type        = bool
  default     = true
}

variable "cloudfront_price_class" {
  description = "CloudFront price class (PriceClass_All, PriceClass_200, PriceClass_100)"
  type        = string
  default     = "PriceClass_100"
}
