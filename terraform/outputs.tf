# Outputs for PathsData Frontend Infrastructure

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = module.frontend.bucket_name
}

output "s3_bucket_arn" {
  description = "ARN of the S3 bucket"
  value       = module.frontend.bucket_arn
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (needed for cache invalidation)"
  value       = module.frontend.cloudfront_distribution_id
}

output "cloudfront_distribution_arn" {
  description = "ARN of the CloudFront distribution"
  value       = module.frontend.cloudfront_distribution_arn
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name"
  value       = module.frontend.cloudfront_domain_name
}

output "cloudfront_url" {
  description = "Full HTTPS URL of the CloudFront distribution"
  value       = module.frontend.cloudfront_url
}

output "deployment_info" {
  description = "Complete deployment information"
  value = {
    environment         = var.environment
    s3_bucket           = module.frontend.bucket_name
    cloudfront_url      = module.frontend.cloudfront_url
    distribution_id     = module.frontend.cloudfront_distribution_id
    aws_region          = var.aws_region
  }
}
