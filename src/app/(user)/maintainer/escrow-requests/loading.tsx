import { Card } from "@/components/ui/card";
import { TableSkeleton, WalletCardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Escrow Requests</h1>

      <Card>
        <TableSkeleton />
      </Card>
    </div>
  );
}