import { useTranslation } from "react-i18next"
import { useSession, type Role } from "@/entities/session"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { Button } from "@/shared/ui/button"
import { UserCog, Check } from "lucide-react"

const roles: Role[] = ["employee", "manager", "security", "admin"]

export function RoleSwitcher() {
  const { t } = useTranslation()
  const { user, login } = useSession()

  const handleRoleChange = (role: Role) => {
    login(role)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <UserCog className="h-4 w-4" />
          <span className="hidden md:inline">{t("topbar.switchRole")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{t("roles.selectRole")}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleChange(role)}
            className="cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span>{t(`roles.${role}`)}</span>
              {user?.role === role && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

