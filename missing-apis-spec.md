# Missing API Endpoints Specification

This document lists all API endpoints that are currently used in the PathsData frontend codebase but are NOT yet documented in `api-schema.json`.

**Status:** Missing from OpenAPI schema
**Version:** 0.1.0
**Date:** 2025-01-02

---

## Overview

These 8 endpoints are actively used in the codebase and need to be added to the OpenAPI specification:

| # | Endpoint | Method | Priority | Used In |
|---|----------|--------|----------|---------|
| 1 | `/api/v1/subscription` | GET | High | Settings page |
| 2 | `/api/v1/subscription` | DELETE | High | Settings page |
| 3 | `/api/v1/roles` | GET | High | User management |
| 4 | `/api/v1/organizations/{organization_id}/members/{user_id}` | PATCH | Medium | User management |
| 5 | `/api/v1/workspaces/{workspace_id}/members/{user_id}` | PATCH | Medium | User management |
| 6 | `/api/v1/workspaces/{workspace_id}/networks` | POST | Medium | Network config |
| 7 | ~~`/organization/invite_user`~~ | POST | Low | DEPRECATED - use `/api/v1/invitations` |
| 8 | ~~`/family/invite_user`~~ | POST | Low | DEPRECATED - use `/api/v1/invitations` |

---

## 1. Subscription Management

### GET /api/v1/subscription

Get subscription details for the authenticated user.

**Used In:**
- `src/pages/Setting/Setting.jsx:28`

**Authentication:** Required (JWT Bearer token)

**Request:**
```http
GET /api/v1/subscription HTTP/1.1
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": {
    "subscription_type": "free|basic|professional|enterprise",
    "status": "active|cancelled|expired",
    "start_date": "2025-01-01T00:00:00Z",
    "end_date": "2026-01-01T00:00:00Z",
    "auto_renew": true,
    "billing_cycle": "monthly|yearly",
    "seats": 5,
    "features": [
      "feature1",
      "feature2"
    ]
  }
}
```

**OpenAPI Specification:**
```yaml
/api/v1/subscription:
  get:
    tags:
      - subscription
    summary: Get Subscription Details
    description: |
      Retrieve subscription information for the authenticated user.

      Returns subscription type, status, billing information, and available features.

      **Authorization:** Requires authentication (JWT token)
    operationId: get_subscription_api_v1_subscription_get
    security:
      - HTTPBearer: []
    responses:
      '200':
        description: Successful Response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/GetSubscriptionResponse'
      '401':
        description: Unauthorized - Invalid or missing token
      '404':
        description: No active subscription found
```

---

### DELETE /api/v1/subscription

Cancel the current subscription.

**Used In:**
- `src/pages/Setting/Setting.jsx:59`

**Authentication:** Required (JWT Bearer token)

**Request:**
```http
DELETE /api/v1/subscription HTTP/1.1
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Subscription cancelled successfully",
  "data": {
    "cancelled_at": "2025-01-02T10:30:00Z",
    "effective_until": "2025-02-01T00:00:00Z"
  }
}
```

**OpenAPI Specification:**
```yaml
  delete:
    tags:
      - subscription
    summary: Cancel Subscription
    description: |
      Cancel the current active subscription.

      The subscription will remain active until the end of the current billing period.

      **Authorization:** Requires authentication (JWT token)
    operationId: cancel_subscription_api_v1_subscription_delete
    security:
      - HTTPBearer: []
    responses:
      '200':
        description: Successful Response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CancelSubscriptionResponse'
      '401':
        description: Unauthorized
      '404':
        description: No active subscription to cancel
```

**Schema Definitions Needed:**
```yaml
components:
  schemas:
    SubscriptionData:
      type: object
      required:
        - subscription_type
        - status
      properties:
        subscription_type:
          type: string
          enum: [free, basic, professional, enterprise]
          description: Subscription tier
        status:
          type: string
          enum: [active, cancelled, expired]
          description: Current subscription status
        start_date:
          type: string
          format: date-time
        end_date:
          type: string
          format: date-time
        auto_renew:
          type: boolean
        billing_cycle:
          type: string
          enum: [monthly, yearly]
        seats:
          type: integer
          description: Number of user seats included
        features:
          type: array
          items:
            type: string

    GetSubscriptionResponse:
      type: object
      required:
        - statusCode
        - data
      properties:
        statusCode:
          type: integer
          example: 200
        data:
          $ref: '#/components/schemas/SubscriptionData'

    CancelSubscriptionResponse:
      type: object
      required:
        - statusCode
        - message
      properties:
        statusCode:
          type: integer
          example: 200
        message:
          type: string
        data:
          type: object
          properties:
            cancelled_at:
              type: string
              format: date-time
            effective_until:
              type: string
              format: date-time
```

---

## 2. Role Management

### GET /api/v1/roles

Get available roles for an organization or workspace.

**Used In:**
- `src/components/Models/Users/CreateUsers.jsx:77`
- `src/components/Models/Users/EditUsers.jsx:79`

**Authentication:** Required (JWT Bearer token)

**Query Parameters:**
- `org_id` (string, uuid, optional): Organization ID
- `workspace_id` (string, uuid, optional): Workspace ID (formerly family_id)

**Note:** Either `org_id` OR `workspace_id` must be provided, not both.

**Request Examples:**
```http
GET /api/v1/roles?org_id=550e8400-e29b-41d4-a716-446655440000 HTTP/1.1
Authorization: Bearer {jwt_token}

GET /api/v1/roles?workspace_id=660f9511-f39c-23e4-b827-557766551111 HTTP/1.1
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "data": [
    {
      "id": "role-uuid-1",
      "role_name": "org_owner",
      "display_name": "Owner",
      "description": "Full administrative access",
      "permissions": ["org:*"],
      "is_system_role": true
    },
    {
      "id": "role-uuid-2",
      "role_name": "org_admin",
      "display_name": "Administrator",
      "description": "Administrative access",
      "permissions": ["org:read", "org:update", "org:invite"],
      "is_system_role": true
    },
    {
      "id": "role-uuid-3",
      "role_name": "org_member",
      "display_name": "Member",
      "description": "Basic member access",
      "permissions": ["org:read"],
      "is_system_role": true
    }
  ]
}
```

**OpenAPI Specification:**
```yaml
/api/v1/roles:
  get:
    tags:
      - roles
    summary: List Roles
    description: |
      Get available roles for an organization or workspace.

      Returns predefined system roles and custom roles for the specified entity.
      Either org_id or workspace_id must be provided.

      **Authorization:** Requires authentication (JWT token)
    operationId: list_roles_api_v1_roles_get
    security:
      - HTTPBearer: []
    parameters:
      - name: org_id
        in: query
        required: false
        schema:
          type: string
          format: uuid
        description: Organization ID (mutually exclusive with workspace_id)
      - name: workspace_id
        in: query
        required: false
        schema:
          type: string
          format: uuid
        description: Workspace ID (mutually exclusive with org_id)
    responses:
      '200':
        description: Successful Response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ListRolesResponse'
      '400':
        description: Bad Request - Must provide either org_id or workspace_id
      '401':
        description: Unauthorized
      '422':
        description: Validation Error
```

**Schema Definitions Needed:**
```yaml
components:
  schemas:
    RoleData:
      type: object
      required:
        - id
        - role_name
        - display_name
      properties:
        id:
          type: string
          format: uuid
          description: Unique role identifier
        role_name:
          type: string
          description: System role name (e.g., org_owner, org_admin)
        display_name:
          type: string
          description: Human-readable role name
        description:
          type: string
          description: Role description
        permissions:
          type: array
          items:
            type: string
          description: List of permission strings
        is_system_role:
          type: boolean
          description: Whether this is a predefined system role

    ListRolesResponse:
      type: object
      required:
        - statusCode
        - data
      properties:
        statusCode:
          type: integer
          example: 200
        data:
          type: array
          items:
            $ref: '#/components/schemas/RoleData'
```

---

## 3. Organization Member Management

### PATCH /api/v1/organizations/{organization_id}/members/{user_id}

Update an organization member's details (name, role, etc.).

**Used In:**
- `src/components/Models/Users/EditUsers.jsx:55`

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**
- `organization_id` (string, uuid, required): Organization ID
- `user_id` (string, uuid, required): User ID to update

**Request:**
```http
PATCH /api/v1/organizations/550e8400-e29b-41d4-a716-446655440000/members/660f9511-f39c-23e4-b827-557766551111 HTTP/1.1
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "John Doe Updated",
  "email_id": "john.doe@example.com",
  "role": "org_admin"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Organization member updated successfully",
  "data": {
    "user_id": "660f9511-f39c-23e4-b827-557766551111",
    "name": "John Doe Updated",
    "email": "john.doe@example.com",
    "role": "org_admin",
    "updated_at": "2025-01-02T10:30:00Z"
  }
}
```

**OpenAPI Specification:**
```yaml
/api/v1/organizations/{organization_id}/members/{user_id}:
  patch:
    tags:
      - organizations
    summary: Update Organization Member
    description: |
      Update an organization member's profile and role.

      Allows updating member name, email, and role assignment.

      **Authorization:** Requires org:update_member permission
    operationId: update_organization_member_api_v1_organizations__organization_id__members__user_id__patch
    security:
      - HTTPBearer: []
    parameters:
      - name: organization_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: Organization ID
      - name: user_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: User ID to update
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpdateOrganizationMemberRequest'
    responses:
      '200':
        description: Successful Response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateOrganizationMemberResponse'
      '401':
        description: Unauthorized
      '403':
        description: Forbidden - Insufficient permissions
      '404':
        description: Organization or user not found
      '422':
        description: Validation Error
```

**Schema Definitions Needed:**
```yaml
components:
  schemas:
    UpdateOrganizationMemberRequest:
      type: object
      properties:
        name:
          type: string
          description: Updated user name
        email_id:
          type: string
          format: email
          description: Updated email address
        role:
          type: string
          description: Updated role (e.g., org_admin, org_member)

    UpdateOrganizationMemberResponse:
      type: object
      required:
        - statusCode
        - message
      properties:
        statusCode:
          type: integer
          example: 200
        message:
          type: string
        data:
          type: object
          properties:
            user_id:
              type: string
              format: uuid
            name:
              type: string
            email:
              type: string
              format: email
            role:
              type: string
            updated_at:
              type: string
              format: date-time
```

---

## 4. Workspace Member Management

### PATCH /api/v1/workspaces/{workspace_id}/members/{user_id}

Update a workspace member's details.

**Used In:**
- `src/components/Models/Users/EditUsers.jsx:56` (currently uses `/family/users`)

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**
- `workspace_id` (string, uuid, required): Workspace ID (formerly family_id)
- `user_id` (string, uuid, required): User ID to update

**Request:**
```http
PATCH /api/v1/workspaces/660f9511-f39c-23e4-b827-557766551111/members/770g0622-g40d-34f5-c938-668877662222 HTTP/1.1
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "email_id": "jane.smith@example.com",
  "role": "workspace_admin"
}
```

**Response (200 OK):**
```json
{
  "statusCode": 200,
  "message": "Workspace member updated successfully",
  "data": {
    "user_id": "770g0622-g40d-34f5-c938-668877662222",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "role": "workspace_admin",
    "updated_at": "2025-01-02T10:30:00Z"
  }
}
```

**OpenAPI Specification:**
```yaml
/api/v1/workspaces/{workspace_id}/members/{user_id}:
  patch:
    tags:
      - workspaces
    summary: Update Workspace Member
    description: |
      Update a workspace member's profile and role.

      Allows updating member name, email, and role assignment within a workspace.

      **Authorization:** Requires workspace:update_member permission
    operationId: update_workspace_member_api_v1_workspaces__workspace_id__members__user_id__patch
    security:
      - HTTPBearer: []
    parameters:
      - name: workspace_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: Workspace ID
      - name: user_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: User ID to update
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/UpdateWorkspaceMemberRequest'
    responses:
      '200':
        description: Successful Response
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateWorkspaceMemberResponse'
      '401':
        description: Unauthorized
      '403':
        description: Forbidden - Insufficient permissions
      '404':
        description: Workspace or user not found
      '422':
        description: Validation Error
```

**Schema Definitions Needed:**
```yaml
components:
  schemas:
    UpdateWorkspaceMemberRequest:
      type: object
      properties:
        name:
          type: string
          description: Updated user name
        email_id:
          type: string
          format: email
          description: Updated email address
        role:
          type: string
          description: Updated role (e.g., workspace_admin, workspace_member)

    UpdateWorkspaceMemberResponse:
      type: object
      required:
        - statusCode
        - message
      properties:
        statusCode:
          type: integer
          example: 200
        message:
          type: string
        data:
          type: object
          properties:
            user_id:
              type: string
              format: uuid
            name:
              type: string
            email:
              type: string
              format: email
            role:
              type: string
            updated_at:
              type: string
              format: date-time
```

---

## 5. Network Management

### POST /api/v1/workspaces/{workspace_id}/networks

Create a new VPC/network configuration for a workspace.

**Used In:**
- `src/pages/Network/AddNetwork.jsx:94` (currently uses `/network`)

**Authentication:** Required (JWT Bearer token)

**Path Parameters:**
- `workspace_id` (string, uuid, required): Workspace ID (formerly family_id)

**Request:**
```http
POST /api/v1/workspaces/660f9511-f39c-23e4-b827-557766551111/networks HTTP/1.1
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "vpc_name": "production-vpc",
  "vpc_id": "vpc-0abcd1234efgh5678",
  "security_group_ids": ["sg-001", "sg-002"],
  "subnet_ids": ["subnet-001", "subnet-002", "subnet-003"],
  "region": "us-east-1",
  "endpoint": "https://vpc.us-east-1.amazonaws.com"
}
```

**Response (201 Created):**
```json
{
  "statusCode": 201,
  "message": "Network created successfully",
  "data": {
    "network_id": "network-uuid-123",
    "workspace_id": "660f9511-f39c-23e4-b827-557766551111",
    "vpc_name": "production-vpc",
    "vpc_id": "vpc-0abcd1234efgh5678",
    "region": "us-east-1",
    "status": "active",
    "created_at": "2025-01-02T10:30:00Z"
  }
}
```

**OpenAPI Specification:**
```yaml
/api/v1/workspaces/{workspace_id}/networks:
  post:
    tags:
      - networks
    summary: Create Network Configuration
    description: |
      Create a new VPC/network configuration for a workspace.

      Configures AWS VPC settings including security groups, subnets, and regional settings.

      **Authorization:** Requires workspace:manage_networks permission
    operationId: create_network_api_v1_workspaces__workspace_id__networks_post
    security:
      - HTTPBearer: []
    parameters:
      - name: workspace_id
        in: path
        required: true
        schema:
          type: string
          format: uuid
        description: Workspace ID
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/CreateNetworkRequest'
    responses:
      '201':
        description: Network created successfully
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateNetworkResponse'
      '400':
        description: Bad Request - Invalid network configuration
      '401':
        description: Unauthorized
      '403':
        description: Forbidden - Insufficient permissions
      '409':
        description: Conflict - Network with this VPC ID already exists
      '422':
        description: Validation Error
```

**Schema Definitions Needed:**
```yaml
components:
  schemas:
    CreateNetworkRequest:
      type: object
      required:
        - vpc_name
        - vpc_id
        - region
      properties:
        vpc_name:
          type: string
          description: Human-readable VPC name
          example: "production-vpc"
        vpc_id:
          type: string
          description: AWS VPC identifier
          example: "vpc-0abcd1234efgh5678"
        security_group_ids:
          type: array
          items:
            type: string
          description: AWS Security Group IDs
        subnet_ids:
          type: array
          items:
            type: string
          description: AWS Subnet IDs
        region:
          type: string
          description: AWS region
          example: "us-east-1"
        endpoint:
          type: string
          format: uri
          description: VPC endpoint URL

    NetworkData:
      type: object
      properties:
        network_id:
          type: string
          format: uuid
        workspace_id:
          type: string
          format: uuid
        vpc_name:
          type: string
        vpc_id:
          type: string
        region:
          type: string
        status:
          type: string
          enum: [active, pending, error]
        created_at:
          type: string
          format: date-time

    CreateNetworkResponse:
      type: object
      required:
        - statusCode
        - message
      properties:
        statusCode:
          type: integer
          example: 201
        message:
          type: string
        data:
          $ref: '#/components/schemas/NetworkData'
```

---

## 6. Deprecated Endpoints (Do Not Add to Schema)

### ~~POST /organization/invite_user~~ (DEPRECATED)

**Status:** DEPRECATED - Use `/api/v1/invitations` instead

**Used In:**
- `src/services/api.js:340` (defined but not actively used)

**Migration Path:**
```javascript
// OLD (deprecated)
await axios.post('/organization/invite_user', { org_id, email, role });

// NEW (use this instead)
await sendInvitation({
  email: 'user@example.com',
  entityType: 'organization',
  entityId: org_id,
  roleName: role,
  inviterName: 'Current User',
  entityName: 'Organization Name'
});
```

**Action Required:** Remove this function from `src/services/api.js`

---

### ~~POST /family/invite_user~~ (DEPRECATED)

**Status:** DEPRECATED - Use `/api/v1/invitations` instead

**Used In:**
- `src/services/api.js:352` (defined but not actively used)

**Migration Path:**
```javascript
// OLD (deprecated)
await axios.post('/family/invite_user', { family_id, email, role });

// NEW (use this instead)
await sendInvitation({
  email: 'user@example.com',
  entityType: 'workspace',
  entityId: workspace_id,  // Note: renamed from family_id
  roleName: role,
  inviterName: 'Current User',
  entityName: 'Workspace Name'
});
```

**Action Required:** Remove this function from `src/services/api.js`

---

## Summary

### Endpoints to Add to api-schema.json (Priority Order):

1. **High Priority:**
   - GET /api/v1/subscription
   - DELETE /api/v1/subscription
   - GET /api/v1/roles

2. **Medium Priority:**
   - PATCH /api/v1/organizations/{organization_id}/members/{user_id}
   - PATCH /api/v1/workspaces/{workspace_id}/members/{user_id}
   - POST /api/v1/workspaces/{workspace_id}/networks

3. **Low Priority (Cleanup):**
   - Remove deprecated invitation endpoints from code

### Terminology Migration:

All references to "family" should be updated to "workspace":
- `family_id` → `workspace_id`
- `/family/users` → `/api/v1/workspaces/{workspace_id}/members`
- `inviteFamilyUser()` → Use `sendInvitation()` with `entityType: 'workspace'`

### Next Steps:

1. Copy the OpenAPI specifications from this document into `api-schema.json`
2. Update `src/services/api.js` to use the new versioned endpoints
3. Update code to replace "family" terminology with "workspace"
4. Test all affected pages (Settings, User Management, Network Config)
5. Remove deprecated invitation endpoints

---

**Document Version:** 1.0
**Last Updated:** 2025-01-02
**Maintained By:** PathsData Development Team
