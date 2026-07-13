import Navbar from "@/components/layout/Navbar";
import SideBar from "@/components/layout/SideBar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <SideBar/>
      <SidebarInset>
        <Navbar/>
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <Outlet/> 
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
