import useAuth from "@/hooks/useAuth"
import { SidebarTrigger } from "../ui/sidebar"
import { useLocation } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import {LogOutIcon, ShieldCheck, ShoppingBag, User } from "lucide-react"

export default function Navbar() {
  const {logOut, user} = useAuth()
  const pageTitles = {
    "/":"Dashboard",
    "/products":"Products",
    "/stores":"Stores",
    "/stocks":"Stocks",
  }
  const location = useLocation();  

  return (
    <header className="flex h-16 items-center justify-between px-6 bg-background border-b">
      <div className="flex items-center gap-5">
        <SidebarTrigger/>
          <h1 className="text-lg font-bold">
            {pageTitles[location.pathname]}
          </h1>
      </div>

      <div>
        <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon" className="rounded-full"><Avatar>
          <AvatarImage src="https://imgs.search.brave.com/UAJ9KLVu2PKwlqXTdGkLVzbxMx-WyTE_VlafSjKyKGg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxOC8w/NC8xOC8xOC81Ni91/c2VyLTMzMzEyNTZf/NjQwLnBuZw" alt="shadcn" />
          <AvatarFallback>LR</AvatarFallback>
        </Avatar></Button>} />
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            {user.name}
          </DropdownMenuItem>
          <DropdownMenuItem>
            {user.role === 'admin'
            ? <ShieldCheck />
            : <ShoppingBag/>
            }
            {user.role}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={logOut}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      </div>
    </header>
  )
}
