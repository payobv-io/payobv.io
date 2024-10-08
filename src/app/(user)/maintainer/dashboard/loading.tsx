import { Card } from "@/components/ui/card";
import { CardWrapperSkeleton } from "@/components/ui/maintainer/skeletons";
import { TableSkeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
        {/* <div className='flex gap-x-4'>
          <a
            href="https://github.com/apps/payobvio-github-app/installations/new"
            target="_blank"
          >
            <Button className="flex items-center space-x-2">
              <PlusCircleIcon className="h-5 w-5" />
              <span>Add Repositories</span>
            </Button>
          </a>
          <ConnectWalletButton />
        </div> */}
      </div>

      <CardWrapperSkeleton />

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Recent Bounties
      </h2>
      <Card>
        <TableSkeleton />
      </Card>
    </div>
  );
}