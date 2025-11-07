# Quick Start Guide

## Getting Started

### 1. Install Dependencies

```bash
# Install Radix UI packages for shadcn/ui components
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator

# Install all dependencies
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:5173`

## Testing Different Roles

### Switch Roles in the UI

1. Look for the **"Switch Role"** button in the top-right corner of the topbar
2. Click it to open the role selector dropdown
3. Select from:
   - **Employee** (default) - Basic access
   - **Manager** - Access Management page visible
   - **Security** - Access Management page visible
   - **Admin** - Full access

### Observe Changes

When you switch roles, notice:

- **Sidebar navigation** updates immediately
- **Access Management** menu item appears/disappears
- Try visiting `/access-management` directly as Employee → redirects to home
- Try visiting `/access-management` as Admin → shows page

## Page Overview

### 📋 Profile (`/profile`)
- Displays current user information
- Shows name, email, and role
- Uses Card components with icons

### 🔑 My Accesses (`/my-accesses`)
- **Fully implemented** with TanStack Table
- Shows mock access data with loading states
- Demonstrates:
  - Data fetching with TanStack Query
  - Skeleton loading UI
  - Empty state handling
  - Table sorting

### 📝 Requests (`/requests`)
- Placeholder for access request management
- Shows empty state with action button

### 📊 Catalog (`/catalog`)
- Placeholder for system catalog
- Includes search input
- Shows empty state

### 🛡️ Access Management (`/access-management`)
- **Protected route** - only Admin, Manager, Security
- Shows dashboard with statistics
- Mock data for pending requests

### 🔔 Notifications (`/notifications`)
- Placeholder for notification center
- Shows empty state

## Code Examples

### Using Session Hook

```tsx
import { useSession } from "@/entities/session"

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useSession()
  
  return (
    <div>
      {user?.name} - {user?.role}
      <button onClick={() => login("admin")}>Switch to Admin</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
```

### Fetching Data with TanStack Query

```tsx
import { useUserAccessesQuery } from "@/entities/access"

function MyComponent() {
  const { data, isLoading, isError } = useUserAccessesQuery()
  
  if (isLoading) return <Skeleton />
  if (isError) return <Error />
  
  return <div>{data?.length} accesses</div>
}
```

### Protected Route

```tsx
import { RequireRole } from "@/shared/lib/RequireRole"

<Route
  path="/admin-only"
  element={
    <RequireRole allowedRoles={["admin"]}>
      <AdminPage />
    </RequireRole>
  }
/>
```

### Using shadcn/ui Components

```tsx
import { Button } from "@/shared/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/ui/card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Card</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Modifying Mock Data

### Change User Accesses

Edit `src/entities/access/api/access-api.ts`:

```typescript
const mockUserAccesses: UserAccess[] = [
  {
    id: 1,
    systemName: "Your System",
    role: "your-role",
    expiresAt: "2026-12-12",
  },
  // Add more...
]
```

### Change Default User Role

Edit `src/entities/session/model/session-store.tsx`:

```typescript
const [user, setUser] = useState<User | null>(() => 
  createMockUser("admin") // Change "employee" to desired role
)
```

## Common Tasks

### Add a New Page

1. **Create page component:**
```bash
mkdir src/pages/my-new-page
touch src/pages/my-new-page/my-new-page.tsx
```

2. **Add route in `app.tsx`:**
```tsx
<Route path="my-new-page" element={<MyNewPage />} />
```

3. **Add to sidebar (optional):**
Edit `src/widgets/sidebar/Sidebar.tsx`:
```tsx
{ to: "/my-new-page", icon: SomeIcon, label: "My New Page" }
```

### Add a Protected Page

```tsx
// In app.tsx
<Route
  path="protected-page"
  element={
    <RequireRole allowedRoles={["admin", "manager"]}>
      <ProtectedPage />
    </RequireRole>
  }
/>

// In Sidebar.tsx
{
  to: "/protected-page",
  icon: Lock,
  label: "Protected Page",
  allowedRoles: ["admin", "manager"], // Hide from sidebar for others
}
```

### Add a New shadcn/ui Component

1. Visit [shadcn/ui documentation](https://ui.shadcn.com/docs/components)
2. Copy component code
3. Place in `src/shared/ui/[component-name].tsx`
4. Install any required Radix UI dependencies
5. Import and use in your components

## Troubleshooting

### "Module not found" errors for Radix UI

```bash
npm install @radix-ui/react-avatar @radix-ui/react-dropdown-menu @radix-ui/react-scroll-area @radix-ui/react-separator
```

### Layout not showing

- Check `src/widgets/layout/AppLayout.tsx` exists
- Verify imports in `src/app/app.tsx`
- Check browser console for errors

### Routes not working

- Ensure `RouterProvider` wraps the app in `main.tsx`
- Check route paths match exactly (no trailing slashes)
- Verify component imports

### Role switching not working

- Check `SessionProvider` is in `main.tsx`
- Verify `useSession()` hook is being called
- Check browser React DevTools for context value

## Architecture Notes

### FSD Layer Rules

```
app/           ← Can import from all layers
  ↓
pages/         ← Can import from widgets, features, entities, shared
  ↓
widgets/       ← Can import from features, entities, shared
  ↓
features/      ← Can import from entities, shared
  ↓
entities/      ← Can import from shared only
  ↓
shared/        ← Can't import from any layer (self-contained)
```

### Key Principles

1. **No upward imports** - Lower layers can't import upper layers
2. **Public API** - Each folder exports through `index.ts`
3. **Isolation** - Features and entities are independent
4. **Composability** - Pages compose widgets, widgets compose features

## Next Steps

1. ✅ Test all roles and pages
2. ✅ Familiarize yourself with the codebase structure
3. 🔄 Replace mock authentication with Keycloak
4. 🔄 Connect to real API endpoints
5. 🔄 Implement full feature workflows

Happy coding! 🚀

