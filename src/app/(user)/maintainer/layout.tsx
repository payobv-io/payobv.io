import Sidebar from "@/components/ui/sidebar";
import { InboxIcon, LayoutDashboardIcon } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/maintainer/dashboard", icon: <LayoutDashboardIcon /> },
  { name: "Escrow Requests", href: "/maintainer/escrow-requests", icon: <InboxIcon />  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex-none md:w-64 relative">
        <Sidebar links={links} />
      </div>
      <div className="flex-grow md:overflow-y-auto">
        <div className="md:pt-[56px] h-screen">
          {children} 
        </div>
      </div>
    </>
  );
}