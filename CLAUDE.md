# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React + Vite application called "PATHSDATA" - a multi-tenant workspace management platform with authentication, user management, network configuration, and cloud resource management capabilities.

## Development Commands

### Dev Server
```bash
npm run dev
```
Starts Vite dev server with `--host` flag (accessible on network)

### Build
```bash
npm run build
```
Creates production build in `dist/` directory

### Lint
```bash
npm run lint
```
Runs ESLint on all `.js` and `.jsx` files

### Preview
```bash
npm run preview
```
Preview production build locally

## Architecture

### Routing Structure

The application has **two distinct layout systems** with separate routing hierarchies:

1. **Main Dashboard Layout** (`/dashboard/*`)
   - Uses `DashboardLayout` component with organization-level navigation
   - Routes: workspace management, users, roles, network, settings, home
   - Layout: `src/layouts/DashboardLayout.jsx`
   - Sidebar: `src/ui/Sidebar.jsx`

2. **Workspace Dashboard Layout** (`/workspace/:workspaceId/*`)
   - Uses `WorkspaceDashboardLayout` for workspace-scoped operations
   - Routes: workspace home, clusters, cloud resources
   - Layout: `src/layouts/workspace/WorkspaceDashboardLayout.jsx`
   - Sidebar: `src/components/workspace/WorkspaceSidebar.jsx`

Both layouts:
- Share the same `Header` component
- Use React Router's `<Outlet />` for nested routing
- Include logout functionality via `Logout` modal component
- Are protected by `ProtectedRoute` wrapper

### Authentication

Authentication state is managed via **localStorage** (not a state management library):

- `jwt_token` - JWT token for API authentication
- `pd-authed` - Boolean flag ('true'/'false' as string)
- Additional stored data: `email`, `family_id`, `user_org_id`, `openCloudOption`, `openUser`

Auth utilities in `src/services/auth.jsx`:
- `isAuthenticated()` - Check auth status
- `setAuth(token)` - Set auth state
- `clearAuth()` - Clear all auth data

`ProtectedRoute` component checks `pd-authed` localStorage value and redirects to `/sign-in` if not authenticated.

### Auth Flow

1. `/sign-in` → OTP verification → `/verify-otp`
2. `/create-profile` → `/create-organization`
3. Redirect to `/dashboard/home` after completion

### Styling

The application uses a **hybrid styling approach**:
- **Tailwind CSS 4.x** - Utility-first framework (configured via PostCSS)
- **Bootstrap 5.3.3** - Component library via CDN (in `index.html`)
- **React Bootstrap** - React components for Bootstrap
- **CSS Pro Layout** - Professional layout system via CDN
- **Semantic UI** - Additional UI components via CDN
- **Custom CSS** - Component-specific stylesheets

External CSS/JS loaded via CDN:
- Bootstrap CSS & JS
- Font Awesome icons
- RemixIcon
- CSS Pro Layout
- Semantic UI
- jQuery (for Bootstrap/Semantic UI dependencies)

### Key Dependencies

- **react-router-dom v7** - Client-side routing with nested routes
- **react-select** - Customizable select inputs
- **react-toastify** - Toast notifications
- **react-bootstrap** - Bootstrap React components

### File Organization

```
src/
├── App.jsx                    # Main router configuration
├── main.jsx                   # React root & BrowserRouter setup
├── routes/
│   └── ProtectedRoute.jsx     # Auth guard component
├── layouts/
│   ├── DashboardLayout.jsx            # Main org-level layout
│   └── workspace/
│       └── WorkspaceDashboardLayout.jsx # Workspace-level layout
├── pages/                     # Page components (one per route)
│   ├── auth/                  # Authentication pages
│   ├── Home/
│   ├── Workspace/
│   ├── Users/
│   ├── Network/
│   ├── Cluster/
│   └── CloudResourceIAMRole/
├── components/                # Reusable components
│   ├── Models/                # Modal dialogs (Logout, CreateUsers, etc.)
│   └── workspace/             # Workspace-specific components
├── ui/                        # UI primitives (Sidebar, etc.)
└── services/
    └── auth.jsx               # Auth utility functions
```

### Important Patterns

1. **Layout Switching**: When navigating between organization-level and workspace-level features, the entire layout (including sidebar) changes. Be mindful when adding new routes to place them under the correct parent route.

2. **Workspace Context**: Workspace-scoped pages use `useParams()` to access `workspaceId` from the URL (`/workspace/:workspaceId/*`).

3. **Modal Management**: Modals use local state (`show` boolean) and callback props (`handleClose`, `handleLogout`). See `Logout.jsx` for the pattern.

4. **Navigation After Auth**: After logout, the app clears specific localStorage flags (`openCloudOption`, `openUser`) in addition to auth tokens.

## Tech Stack

- React 19.x (with React.StrictMode)
- Vite 7.x (build tool with HMR)
- React Router DOM v7 (routing)
- Tailwind CSS 4.x + Bootstrap 5 + custom CSS (styling)
- ESLint 9.x (flat config format)
