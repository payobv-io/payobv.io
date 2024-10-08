import { NavLink } from '@/lib/types';
import { Logo } from './logo';
import NavLinks from './nav-links';
import WalletDetailsContainer from './wallet-details-card';

type SidebarProps = {
  links: NavLink[];
};

export default function Sidebar({ links }: SidebarProps) {
  return (
    <div className="flex h-full flex-col justify-between px-3 pt-2 pb-6 md:px-2 fixed md:w-64">
      <div className="flex flex-col gap-y-4">
        <Logo />
        <div className="flex grow flex-row md:flex-col md:gap-y-2">
          <NavLinks links={links} />
        </div>
      </div>
      <div className="px-3">
        <WalletDetailsContainer />
      </div>
    </div>
  );
}
