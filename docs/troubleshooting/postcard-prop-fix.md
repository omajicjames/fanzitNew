# PostCard Prop Fix

## Issue
Runtime error: `TypeError: Cannot read properties of undefined (reading 'id')` in BasePostCard.tsx at line 51.

## Root Cause
The PostCard component was not passing the required `post` prop to BasePostCard.Root, causing the BasePostCard component to receive undefined for the post data.

## Solution
Updated the PostCard component to properly pass the `view` prop as the `post` prop to BasePostCard.Root.

## Changes Made

### 1. Fixed BasePostCard.tsx
- **Location**: `/src/features/post/BasePostCard.tsx:81`
- **Change**: Added null check for post.id in aria-labelledby attribute
- **Before**: `aria-labelledby={\`post-title-${post.id}\`}`
- **After**: `aria-labelledby={post?.id ? \`post-title-${post.id}\` : undefined}`

### 2. Fixed PostCard.tsx
- **Location**: `/src/features/post/PostCard.tsx:112`
- **Change**: Added missing post prop to BasePostCard.Root
- **Before**: `<BasePostCard.Root className={featured ? "border-2 border-blue-200" : undefined}>`
- **After**: `<BasePostCard.Root post={view} className={featured ? "border-2 border-blue-200" : undefined}>`

## Technical Details
- The PostCard component receives a `view` prop of type PostView
- BasePostCard.Root expects a `post` prop of type PostView
- The fix ensures proper data flow between components

## Files Modified
- `/src/features/post/BasePostCard.tsx` - Added null safety check
- `/src/features/post/PostCard.tsx` - Added missing post prop

## Outcome
- ✅ Runtime error resolved
- ✅ PostCard component renders correctly
- ✅ Proper prop passing between components
- ✅ Null safety implemented for edge cases

## Testing
Verified that the application loads without errors and PostCard components render properly in the main feed.