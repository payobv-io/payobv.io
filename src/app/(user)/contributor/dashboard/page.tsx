import { Card } from '@/components/ui/card';
import CardWrapper from '@/components/ui/contributor/dashboard/card-wrapper';
import BountyTable from '@/components/ui/contributor/dashboard/table';
import WalletCard from '@/components/ui/maintainer/escrow-requests/wallet-card';
import { getServerSessionID } from '@/lib/actions';

export default async function Page() {
  const userID = await getServerSessionID();

  if (!userID) {
    return null;
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <WalletCard />
        </div>

        <CardWrapper userId={userID} />

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Bounties
        </h2>
        <Card>
          <BountyTable userId={userID} />
        </Card>
      </div>
    </main>
  );
}
