"use client"

import Link from "next/link"
import { Plus, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { useAuth } from "@/context"


const Logo = () => (
  <Link href="/" className="text-2xl font-bold text-silver hover:text-gray-300 transition-colors">
    {"<CWH/>"}
  </Link>
)

export function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <Logo />

      <Menubar className="border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link href="/" className="cursor-pointer hover:text-primary transition-colors">
              Home
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link href="/about" className="cursor-pointer hover:text-primary transition-colors">
              About
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger asChild>
            <Link href="/blogs" className="cursor-pointer hover:text-primary transition-colors">
              Blogs
            </Link>
          </MenubarTrigger>
        </MenubarMenu>
      </Menubar>

      <div className="flex items-center gap-4">
        <Link href={user ? "/profile" : "/login"}>
          <Avatar className="hover:ring-2 ring-primary transition-all cursor-pointer">
            <AvatarImage src={user?.user_image} alt="User" />
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Link>
        
        <Link href="/create">
          <Button size="icon" className="hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </nav>
  )
}