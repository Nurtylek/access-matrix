import { Navigate } from "react-router-dom"
import { useSession, type Role } from "@/entities/session"
import type { ReactNode } from "react"

interface RequireRoleProps {
  children: ReactNode
  allowedRoles: Role[]
}

export function RequireRole({ children, allowedRoles }: RequireRoleProps) {
  const { user, isAuthenticated } = useSession()

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

