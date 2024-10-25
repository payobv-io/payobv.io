import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ConnectWalletButton from '@/components/ui/connect-wallet-button';
import CardWrapper from '@/components/ui/maintainer/dashboard/card-wrapper';
import BountyTable from '@/components/ui/maintainer/dashboard/table';
import { CardWrapperSkeleton } from '@/components/ui/maintainer/skeletons';
import { getServerSessionID } from '@/lib/actions';
import { GITHUB_APP_INSTALLATION_URL } from '@/lib/constants';
import { PlusCircleIcon } from 'lucide-react';
import { Suspense } from 'react';

export default async function Page() {
  const userID = await getServerSessionID();

  if (!userID) {
    return null;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        <a
          href={GITHUB_APP_INSTALLATION_URL}
          target="_blank"
        >
          <Button className="flex items-center space-x-2">
            <PlusCircleIcon className="h-5 w-5" />
            <span>Add Repositories</span>
          </Button>
        </a>
      </div>

      <Suspense fallback={<CardWrapperSkeleton />}>
        <CardWrapper userId={userID} />
      </Suspense>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Bounties
      </h2>
      <Card>
        <BountyTable userId={userID} />
      </Card>
    </div>
  );
}
