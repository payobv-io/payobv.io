import Link from "next/link";
import NavLinks from "./nav-links";
import { NavLink } from "@/lib/types";

type SidebarProps = {
  links: NavLink[]
}

export default function Sidebar({ links }: SidebarProps) {
  return (
  <div className="flex h-full flex-col px-3 py-2 md:px-2 fixed z-20 md:w-64">
    <Link
      className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40"
      href="/"
    >
      <div className="w-32 text-white md:w-40">
        payobv.io
      </div>
    </Link>
    <div className="flex grow flex-row md:flex-col">
      <NavLinks links={links}/>
    </div>
  </div>)
}