import { createContext, useContext, useState, ReactNode } from "react"
import type { User, SessionState, Role } from "./types"

const SessionContext = createContext<SessionState | undefined>(undefined)

const createMockUser = (role: Role): User => ({
  id: "1",
  name: "Test User",
  email: `test.user@company.com`,
  role,
})

interface SessionProviderProps {
  children: ReactNode
}

export function SessionProvider({ children }: SessionProviderProps) {
  const [user, setUser] = useState<User | null>(() => createMockUser("employee"))

  const login = (role: Role = "employee") => {
    setUser(createMockUser(role))
  }

  const logout = () => {
    setUser(null)
  }

  const value: SessionState = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider")
  }
  return context
}

