import { Outlet } from "react-router-dom"
import { AppSidebar } from "../sidebar/AppSidebar"
import { Topbar } from "../topbar/Topbar"
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar"

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Topbar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
