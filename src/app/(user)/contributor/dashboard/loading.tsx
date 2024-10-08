import { Card } from "@/components/ui/card";
import { CardWrapperSkeleton } from "@/components/ui/contributor/skeletons";
import { TableSkeleton, WalletCardSkeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>

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