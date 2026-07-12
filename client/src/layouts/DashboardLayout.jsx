import Navbar from "@/components/layout/Navbar";
import SideBar from "@/components/layout/SideBar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <SideBar/>
      <div>
        <Navbar/>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  )
}
