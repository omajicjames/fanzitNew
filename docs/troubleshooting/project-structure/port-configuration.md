# Port Configuration Fix

## Issue
The development server port was hardcoded to 3000, causing conflicts when that port was already in use.

## Solution
Updated the project to use dynamic port configuration through environment variables.

## Changes Made

### 1. Package.json Scripts
- Updated `dev` script to use `${PORT:-3000}` (defaults to 3000 if PORT not set)
- Updated `start` script to use `${PORT:-3000}`

### 2. Base URL Configuration
- Modified `docs/Must_dos.md` to use `process.env.PORT || 3000` for localhost URLs
- This ensures the base URL matches the actual server port

### 3. Documentation Updates
- Updated `docs/troubleshooting/fast-refresh/dev-server-issues.md` to reflect dynamic port
- Created `.env.example` file to document PORT environment variable

## Usage

### Default Port (3000)
```bash
pnpm dev
```

### Custom Port
```bash
PORT=3002 pnpm dev
```

### Using .env file
Create a `.env.local` file:
```
PORT=3002
```

Then run:
```bash
pnpm dev
```

## Technical Implementation

### Environment Variable Priority
1. `PORT` environment variable
2. Default fallback to port 3000

### Files Modified
- `package.json` - Updated dev and start scripts
- `docs/Must_dos.md` - Updated getBaseUrl function
- `docs/troubleshooting/fast-refresh/dev-server-issues.md` - Updated documentation
- `.env.example` - Created for reference

## Benefits
- No more port conflicts
- Flexible deployment options
- Environment-specific configuration
- Maintains backward compatibility with default port 3000