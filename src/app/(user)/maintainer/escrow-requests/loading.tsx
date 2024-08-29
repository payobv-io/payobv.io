import { Card } from "@/components/ui/card";
import { WalletCardSkeleton } from "@/components/ui/maintainer/skeletons";
import { TableSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Escrow Requests</h1>
        <WalletCardSkeleton />
      </div>

      <Card>
        <TableSkeleton />
      </Card>
    </div>
  );
}