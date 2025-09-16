# Auth Folder and Login Information Locations

## Issue Summary
User inquiry about the location of auth folder with login information in the Fanzit project.

## Auth Folder Structure

### Primary Auth Components Location
**Path:** `/src/features/auth/components/`

Contains the main authentication components:
- `auth-provider.tsx` - Authentication context provider with user state management
- `login-form.tsx` - Main login/signup form component with demo authentication
- `protected-route.tsx` - Route protection wrapper component

### Auth Page Location
**Path:** `/app/(public)/auth/`

Contains:
- `page.tsx` - Auth page that renders the LoginForm component

## Login Information Details

### Demo Authentication Setup
The current authentication system uses demo/mock data stored in localStorage:

**Demo User Credentials:**
- Email: `demo@example.com`
- Name: `Demo User`
- ID: `1`
- Creator Status: `true`

### Authentication Flow
1. **Login Form** (`src/features/auth/components/login-form.tsx`)
   - Handles login/signup UI
   - Simulates API call with 1-second delay
   - Stores demo user data in localStorage
   - Redirects to home page after successful login

2. **Auth Provider** (`src/features/auth/components/auth-provider.tsx`)
   - Manages authentication state
   - Provides login, signup, logout functions
   - Handles user profile updates
   - Checks localStorage for existing user session

3. **Protected Routes** (`src/features/auth/components/protected-route.tsx`)
   - Wraps components that require authentication
   - Redirects unauthenticated users to login

### User Interface Structure
```typescript
interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isCreator: boolean
  subscriptions: string[]
  createdAt: string
}
```

## Current Status
- ✅ Auth components properly organized in `/src/features/auth/components/`
- ✅ Auth page accessible at `/app/(public)/auth/`
- ✅ Demo authentication working with localStorage
- ⚠️ Using mock authentication (not production-ready)

## Notes
- The authentication system is currently set up for demo purposes
- Real authentication would require backend API integration
- User data is stored in browser localStorage for demo functionality
- All auth-related TypeScript errors in the terminal are related to missing UI component imports

## Related Files
- Login form: `src/features/auth/components/login-form.tsx`
- Auth provider: `src/features/auth/components/auth-provider.tsx`
- Protected routes: `src/features/auth/components/protected-route.tsx`
- Auth page: `app/(public)/auth/page.tsx`

Date: $(date)
Status: Documented