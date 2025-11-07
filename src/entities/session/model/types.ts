export type Role = "admin" | "manager" | "security" | "employee"

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface SessionState {
  user: User | null
  isAuthenticated: boolean
  login: (role?: Role) => void
  logout: () => void
}

