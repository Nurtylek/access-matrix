import { useTranslation } from "react-i18next"
import { NavLink, useLocation } from "react-router-dom"
import { useSession } from "@/entities/session"
import { cn } from "@/shared/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"
import {
  User,
  Key,
  List,
  Table,
  Shield,
  Bell,
  Home,
} from "lucide-react"

interface NavItem {
  to: string
  icon: React.ComponentType<{ className?: string }>
  labelKey: string
  allowedRoles?: string[]
}

const navItems: NavItem[] = [
  { to: "/profile", icon: User, labelKey: "nav.profile" },
  { to: "/my-accesses", icon: Key, labelKey: "nav.myAccesses" },
  { to: "/requests", icon: List, labelKey: "nav.requests" },
  { to: "/catalog", icon: Table, labelKey: "nav.catalog" },
  {
    to: "/access-management",
    icon: Shield,
    labelKey: "nav.accessManagement",
    allowedRoles: ["admin", "manager", "security"],
  },
  { to: "/notifications", icon: Bell, labelKey: "nav.notifications" },
]

export function AppSidebar() {
  const { t } = useTranslation()
  const { user } = useSession()
  const location = useLocation()

  const visibleNavItems = navItems.filter((item) => {
    if (!item.allowedRoles) return true
    return user && item.allowedRoles.includes(user.role)
  })

  const isItemActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/")
  }

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader className="border-b pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="flex items-center gap-3 h-14">
                <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Home className="size-5" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-base">{t("sidebar.brand")}</span>
                  <span className="text-xs text-muted-foreground">
                    {t("sidebar.version")}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {visibleNavItems.map((item) => {
                const Icon = item.icon
                const isActive = isItemActive(item.to)
                
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton 
                      size="lg" 
                      asChild 
                      tooltip={t(item.labelKey)}
                      isActive={isActive}
                    >
                      <NavLink
                        to={item.to}
                        className={cn(
                          "h-12 text-base transition-all duration-200",
                          isActive && [
                            "bg-primary text-primary-foreground font-semibold",
                            "shadow-sm hover:bg-primary/90"
                          ],
                          !isActive && [
                            "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                          ]
                        )}
                      >
                        <Icon className={cn(
                          "size-5 transition-all",
                          isActive && "scale-110"
                        )} />
                        <span>{t(item.labelKey)}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-sm font-medium">
                  {t("sidebar.role")}: {t(`roles.${user?.role}`)}
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

