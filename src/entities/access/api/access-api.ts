import { useQuery } from "@tanstack/react-query"
import type { UserAccess } from "../model/types"

const mockUserAccesses: UserAccess[] = [
  {
    id: 1,
    systemName: "Keycloak",
    role: "viewer",
    expiresAt: "2026-12-12",
  },
  {
    id: 2,
    systemName: "Backoffice",
    role: "editor",
    expiresAt: "2025-04-01",
  },
  {
    id: 3,
    systemName: "Analytics Dashboard",
    role: "admin",
    expiresAt: "2026-06-15",
  },
  {
    id: 4,
    systemName: "HR Portal",
    role: "viewer",
    expiresAt: "2025-12-31",
  },
  {
    id: 5,
    systemName: "Finance System",
    role: "auditor",
    expiresAt: "2026-03-20",
  },
]

// Simulate API call with delay
const fetchUserAccesses = async (): Promise<UserAccess[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600))
  return mockUserAccesses
}

export function useUserAccessesQuery() {
  return useQuery({
    queryKey: ["userAccesses"],
    queryFn: fetchUserAccesses,
  })
}

