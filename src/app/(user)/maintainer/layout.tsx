import Sidebar from "@/components/ui/sidebar";
import { InboxIcon, LayoutDashboardIcon } from "lucide-react";

const links = [
  { name: "Dashboard", href: "/maintainer/dashboard", icon: <LayoutDashboardIcon /> },
  { name: "Escrow Requests", href: "/maintainer/escrow-requests", icon: <InboxIcon />  }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="w-full flex-none md:w-64 relative z-20 bg-white">
        <Sidebar links={links} />
      </div>
      <div className="flex-grow md:overflow-y-auto">
        <div className="md:pt-[56px] h-screen">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
            {children} 
          </main>
        </div>
      </div>
    </>
  );
}