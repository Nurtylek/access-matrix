# Installation Instructions

## Quick Install

Run this command to install the required Radix UI packages for shadcn/ui components:

```bash
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator
```

## Why These Packages?

**Important:** shadcn/ui is NOT a component library you install. It's a collection of copy-paste components that use **Radix UI primitives** under the hood.

The shadcn/ui components in this project use these Radix UI packages:

- `@radix-ui/react-avatar` → Used by `Avatar` component
- `@radix-ui/react-dropdown-menu` → Used by `DropdownMenu` component
- `@radix-ui/react-scroll-area` → Used by `ScrollArea` component
- `@radix-ui/react-separator` → Used by `Separator` component

## Start Development Server

After installing the packages:

```bash
npm run dev
```

Navigate to: `http://localhost:5173`

## Verify Installation

You should see:
- ✅ Sidebar on the left with navigation
- ✅ Topbar on the top with "Switch Role" button
- ✅ Profile page by default
- ✅ No console errors

## Test Role Switching

1. Click **"Switch Role"** button (top-right)
2. Select different roles (Employee, Manager, Security, Admin)
3. Watch the sidebar update
4. Try accessing `/access-management` with different roles

## Troubleshooting

### If you see "Module not found" errors:

```bash
# Make sure all packages are installed
npm install

# Install Radix UI packages
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator
```

### If layout is broken:

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator
```

### If you see TypeScript errors:

```bash
# Restart TypeScript server in your editor
# In VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

## That's It! 🎉

You're ready to start developing. Check out `USAGE_GUIDE.md` for more details.

