'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';

export default function Header() {
  const pathname = usePathname();
  const userType = pathname.startsWith('/maintainer') ? "Maintainer" : "Contributor";
  // Get the session provider from the context
  const session = useSession();
  const user = session.data?.user;
  const userName = user?.name ?? userType;

  return (
    <header className="bg-white shadow-sm z-10 fixed w-full md:pl-64">
      <div className="sm:px-6 lg:px-3 flex justify-between items-center md:h-[56px]">
        <div className="flex items-center">
          <span className="ml-2 font-semibold text-lg text-gray-900">
            {
              `${userType} Space`
            }
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>
                  {userName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-y-1">
                <p className="text-sm font-medium leading-none">
                  {userName}
                </p>
                {
                  user?.email 
                  ?
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  : undefined
                }
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {userType === "Maintainer" ? (
              <Link href="/contributor/dashboard">
                <DropdownMenuItem>Contributor</DropdownMenuItem>
              </Link>
            ) : (
              <Link href="/maintainer/dashboard">
                <DropdownMenuItem>Maintainer</DropdownMenuItem>
              </Link>
            )}
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
  );
}
