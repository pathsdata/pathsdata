/**
 * Centralized API Service Layer
 * Based on PathsData OpenAPI v0.1.0 specification
 *
 * All API endpoints are defined here for easy maintenance and updates.
 * Uses the Axios instance from helper/Axios.js which handles:
 * - JWT token injection
 * - Error handling
 * - Session timeout
 * - Request/response logging
 */

import { Axios } from '../helper/Axios';

// ============================================================================
// AUTHENTICATION ENDPOINTS
// ============================================================================

/**
 * Request OTP for sign-in
 * POST /api/v1/auth/signin
 * @param {Object} data - { email: string }
 * @returns {Promise} Response with message
 */
export const requestSignInOTP = (data) => {
  return Axios.post('/api/v1/auth/signin', data);
};

/**
 * Verify OTP and get JWT token
 * POST /api/v1/auth/verify-otp
 * @param {Object} data - { email: string, otpCode: string }
 * @returns {Promise} Response with { jwt_token: string, user_id: string }
 */
export const verifySignInOTP = (data) => {
  return Axios.post('/api/v1/auth/verify-otp', data);
};

/**
 * Resend OTP to email
 * POST /api/v1/auth/resend-otp
 * @param {Object} data - { email: string }
 * @returns {Promise} Response with message
 */
export const resendOTP = (data) => {
  return Axios.post('/api/v1/auth/resend-otp', data);
};

// ============================================================================
// ORGANIZATION ENDPOINTS
// ============================================================================

/**
 * List organizations where user is a member
 * GET /api/v1/organizations
 * @returns {Promise} Response with organizations array
 */
export const listOrganizations = () => {
  return Axios.get('/api/v1/organizations');
};

/**
 * Create a new organization
 * POST /api/v1/organizations
 * @param {Object} data - { name: string, description?: string }
 * @returns {Promise} Response with created organization
 */
export const createOrganization = (data) => {
  return Axios.post('/api/v1/organizations', data);
};

/**
 * Get organization details
 * GET /api/v1/organizations/{organization_id}
 * @param {string} organizationId - UUID of organization
 * @returns {Promise} Response with organization details
 */
export const getOrganization = (organizationId) => {
  return Axios.get(`/api/v1/organizations/${organizationId}`);
};

/**
 * Update organization details
 * PATCH /api/v1/organizations/{organization_id}
 * @param {string} organizationId - UUID of organization
 * @param {Object} data - { name?: string, description?: string }
 * @returns {Promise} Response with updated organization
 */
export const updateOrganization = (organizationId, data) => {
  return Axios.patch(`/api/v1/organizations/${organizationId}`, data);
};

/**
 * Delete (deactivate) organization
 * DELETE /api/v1/organizations/{organization_id}
 * @param {string} organizationId - UUID of organization
 * @returns {Promise} 204 No Content response
 */
export const deleteOrganization = (organizationId) => {
  return Axios.delete(`/api/v1/organizations/${organizationId}`);
};

/**
 * Add member to organization
 * POST /api/v1/organizations/{organization_id}/members
 * @param {string} organizationId - UUID of organization
 * @param {Object} data - { user_id: string, role_id: string }
 * @returns {Promise} Response with added member
 */
export const addOrganizationMember = (organizationId, data) => {
  return Axios.post(`/api/v1/organizations/${organizationId}/members`, data);
};

/**
 * Remove member from organization
 * DELETE /api/v1/organizations/{organization_id}/members/{member_user_id}
 * @param {string} organizationId - UUID of organization
 * @param {string} memberUserId - UUID of member to remove
 * @returns {Promise} Response with confirmation
 */
export const removeOrganizationMember = (organizationId, memberUserId) => {
  return Axios.delete(`/api/v1/organizations/${organizationId}/members/${memberUserId}`);
};

// ============================================================================
// INVITATION ENDPOINTS
// ============================================================================

/**
 * Send invitation to join organization or workspace
 * POST /api/v1/invitations
 * @param {Object} data - {
 *   email: string,
 *   entityType: "organization" | "workspace",
 *   entityId: string (UUID),
 *   roleName: string,
 *   inviterName: string,
 *   entityName: string
 * }
 * @returns {Promise} Response with invitation details
 */
export const sendInvitation = (data) => {
  return Axios.post('/api/v1/invitations', data);
};

/**
 * List invitations (sent or received)
 * GET /api/v1/invitations
 * @param {Object} params - Query parameters { type?: 'sent' | 'received' }
 * @returns {Promise} Response with invitations array
 */
export const listInvitations = (params = {}) => {
  return Axios.get('/api/v1/invitations', { params });
};

/**
 * Revoke invitation
 * DELETE /api/v1/invitations/{invitation_id}
 * @param {string} invitationId - UUID of invitation
 * @returns {Promise} Response with confirmation
 */
export const revokeInvitation = (invitationId) => {
  return Axios.delete(`/api/v1/invitations/${invitationId}`);
};

/**
 * Accept invitation
 * POST /api/v1/invitations/{token}/accept
 * @param {string} token - Invitation token from email
 * @returns {Promise} Response with confirmation
 */
export const acceptInvitation = (token) => {
  return Axios.post(`/api/v1/invitations/${token}/accept`);
};

// ============================================================================
// MARKETPLACE ENDPOINTS (AWS Marketplace Integration)
// ============================================================================

/**
 * Register marketplace customer
 * POST /api/v1/marketplace/register
 * @param {Object} data - Marketplace registration data
 * @returns {Promise} Response with registration status
 */
export const registerMarketplaceCustomer = (data) => {
  return Axios.post('/api/v1/marketplace/register', data);
};

/**
 * Link AWS account to marketplace subscription
 * POST /api/v1/marketplace/link-account
 * @param {Object} data - AWS account linking data
 * @returns {Promise} Response with linking status
 */
export const linkAwsAccount = (data) => {
  return Axios.post('/api/v1/marketplace/link-account', data);
};

/**
 * Complete marketplace registration
 * POST /api/v1/marketplace/complete-registration
 * @param {Object} data - Registration completion data
 * @returns {Promise} Response with completion status
 */
export const completeMarketplaceRegistration = (data) => {
  return Axios.post('/api/v1/marketplace/complete-registration', data);
};

// ============================================================================
// DATA CATALOG ENDPOINTS
// ============================================================================

/**
 * Get data catalog
 * GET /api/v1/data-catalog
 * @param {Object} params - Query parameters
 * @returns {Promise} Response with data catalog
 */
export const getDataCatalog = (params = {}) => {
  return Axios.get('/api/v1/data-catalog', { params });
};

// ============================================================================
// QUERY INTERFACE
// ============================================================================

/**
 * Query interface endpoint
 * GET /api/v1/query
 * @param {Object} params - Query parameters
 * @returns {Promise} Response with query results
 */
export const queryData = (params = {}) => {
  return Axios.get('/api/v1/query', { params });
};

// ============================================================================
// HEALTH CHECK
// ============================================================================

/**
 * Health check endpoint
 * GET /health
 * @returns {Promise} Response with health status
 */
export const healthCheck = () => {
  return Axios.get('/health');
};

// ============================================================================
// PROFILE ENDPOINTS
// ============================================================================

/**
 * Get user profile
 * GET /api/v1/profile
 * @returns {Promise} Response with user profile
 */
export const getProfile = () => {
  return Axios.get('/api/v1/profile');
};

/**
 * Create/Update user profile
 * POST /api/v1/profile
 * @param {Object} data - Profile data
 * @returns {Promise} Response with updated profile
 */
export const createProfile = (data) => {
  return Axios.post('/api/v1/profile', data);
};

// ============================================================================
// LEGACY/UNDOCUMENTED ENDPOINTS
// ⚠️ WARNING: These endpoints are used in the codebase but NOT documented in OpenAPI v0.1.0
// See missing-apis-spec.md for detailed specifications
// ============================================================================

/**
 * Get subscription details
 * GET /subscription
 * ⚠️ LEGACY - Not in OpenAPI schema
 * @returns {Promise} Response with subscription details
 */
export const getSubscription = () => {
  return Axios.get('/subscription');
};

/**
 * Delete subscription
 * DELETE /subscription
 * ⚠️ LEGACY - Not in OpenAPI schema
 * @returns {Promise} Response with deletion confirmation
 */
export const deleteSubscription = () => {
  return Axios.delete('/subscription');
};

/**
 * Get roles for organization or workspace
 * GET /roles
 * ⚠️ LEGACY - Not in OpenAPI schema
 * @param {Object} params - { org_id?: string, workspace_id?: string }
 * @returns {Promise} Response with roles array
 */
export const getRoles = (params = {}) => {
  return Axios.get('/roles', { params });
};

/**
 * Update organization users
 * PATCH /organization/users
 * ⚠️ LEGACY - Not in OpenAPI schema
 * @param {Object} data - User update data
 * @returns {Promise} Response with updated user
 */
export const updateOrganizationUsers = (data) => {
  return Axios.patch('/organization/users', data);
};

/**
 * Update workspace users
 * PATCH /workspace/users
 * ⚠️ LEGACY - Not in OpenAPI schema
 * Note: Should be migrated to PATCH /api/v1/workspaces/{workspace_id}/members/{user_id}
 * @param {Object} data - User update data
 * @returns {Promise} Response with updated user
 */
export const updateWorkspaceUsers = (data) => {
  return Axios.patch('/workspace/users', data);
};

/**
 * @deprecated Use updateWorkspaceUsers instead
 * Kept for backward compatibility
 */
export const updateFamilyUsers = updateWorkspaceUsers;

/**
 * Invite user to organization
 * POST /organization/invite_user
 * ⚠️ LEGACY - Not in OpenAPI schema
 * ⚠️ DEPRECATED: Use sendInvitation() instead with OpenAPI v0.1.0 format
 * @param {Object} data - Invitation data
 * @returns {Promise} Response with invitation details
 */
export const inviteOrganizationUser = (data) => {
  return Axios.post('/organization/invite_user', data);
};

/**
 * Invite user to workspace
 * POST /workspace/invite_user
 * ⚠️ LEGACY - Not in OpenAPI schema
 * ⚠️ DEPRECATED: Use sendInvitation() with entityType: 'workspace' instead
 * @param {Object} data - Invitation data
 * @returns {Promise} Response with invitation details
 */
export const inviteWorkspaceUser = (data) => {
  return Axios.post('/workspace/invite_user', data);
};

/**
 * @deprecated Use inviteWorkspaceUser or sendInvitation instead
 * Kept for backward compatibility
 */
export const inviteFamilyUser = inviteWorkspaceUser;

/**
 * Create network/VPC for a workspace
 * POST /network
 * ⚠️ LEGACY - Not in OpenAPI schema
 * Note: Should be migrated to POST /api/v1/workspaces/{workspace_id}/networks
 * @param {Object} data - Network configuration data (includes workspace_id, formerly family_id)
 * @returns {Promise} Response with created network
 */
export const createNetwork = (data) => {
  return Axios.post('/network', data);
};

// Export all as named exports
export default {
  // Auth
  requestSignInOTP,
  verifySignInOTP,
  resendOTP,

  // Organizations
  listOrganizations,
  createOrganization,
  getOrganization,
  updateOrganization,
  deleteOrganization,
  addOrganizationMember,
  removeOrganizationMember,

  // Invitations
  sendInvitation,
  listInvitations,
  revokeInvitation,
  acceptInvitation,

  // Marketplace
  registerMarketplaceCustomer,
  linkAwsAccount,
  completeMarketplaceRegistration,

  // Data & Query
  getDataCatalog,
  queryData,

  // Health
  healthCheck,

  // Legacy/Additional
  getProfile,
  createProfile,
  getSubscription,
  deleteSubscription,
  getRoles,
  updateOrganizationUsers,
  updateWorkspaceUsers,
  updateFamilyUsers, // deprecated alias
  inviteOrganizationUser,
  inviteWorkspaceUser,
  inviteFamilyUser, // deprecated alias
  createNetwork,
};
