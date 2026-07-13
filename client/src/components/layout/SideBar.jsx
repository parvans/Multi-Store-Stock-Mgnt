import { Boxes, LayoutDashboard, Package, Store } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavLink } from "react-router-dom";

const routes = [
  {
    title:"Dashboard",
    icon:LayoutDashboard,
    path:"/"
  },
  {
    title:"Products",
    icon:Package,
    path:"/products"
  },
  {
    title:"Stores",
    icon:Store,
    path:"/stores"
  },
  {
    title:"Stocks",
    icon:Boxes,
    path:"/stocks"
  },
]
export default function SideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-5">
        <div className="flex items-center gap-3">
          <div className=" flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground" >
            <Boxes size={20}/>
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">
              Multi-Store-Stock
            </h2>
            <p className="text-xs text-muted-foreground">
              Multi Store Stock Management
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-5">
        <SidebarMenu>
          {
            routes.map((route)=>(
              <SidebarMenuItem key={route.path}>
                <NavLink to={route.path} end={route.path === "/"}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                    variant="outline" 
                    asChild 
                    isActive={isActive}
                    >
                      <div className="flex items-center gap-3">
                        <route.icon />
                        <span>{route.title}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

