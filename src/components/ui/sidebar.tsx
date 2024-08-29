import { NavLink } from '@/lib/types';
import Link from 'next/link';
import NavLinks from './nav-links';

type SidebarProps = {
  links: NavLink[];
};

export default function Sidebar({ links }: SidebarProps) {
  return (
    <div className="flex h-full flex-col px-3 py-2 md:px-2 fixed md:w-64 gap-y-4">
      <Link
        className="mb-2 flex items-end justify-center rounded-md p-4"
        href="/"
      >
        <div className="w-32 md:w-40 flex text-2xl justify-center font-bold">
          <span>payobv.</span>
          <span className="text-blue-600">io</span>
        </div>
      </Link>
      <div className="flex grow flex-row md:flex-col md:gap-y-2">
        <NavLinks links={links} />
      </div>
    </div>
  );
}
