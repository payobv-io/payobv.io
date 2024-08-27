"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "./button"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow-sm z-10 fixed w-full md:pl-64">
      <div className="max-w-7xl sm:px-6 lg:px-3 flex justify-between items-center md:h-[56px]">
        <div className="flex items-center">
          <span className="ml-2 font-semibold text-xl text-gray-900">Maintainer</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Profile
            </DropdownMenuItem>
            {
              pathname.startsWith('/maintainer') 
              ? undefined
              :  
              <Link href="/maintainer/dashboard">
                <DropdownMenuItem>
                  Maintainer
                </DropdownMenuItem>  
              </Link>
            }
            <DropdownMenuItem>
              Contributor
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}