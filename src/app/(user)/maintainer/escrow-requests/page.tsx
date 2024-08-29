import { Card } from "@/components/ui/card";
import EscrowRequestTable from "@/components/ui/maintainer/escrow-requests/table";
import WalletCard from "@/components/ui/maintainer/escrow-requests/wallet-card";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-gray-800">Escrow Requests</h1>
        <WalletCard />
      </div>

      <Card>
        <Suspense fallback={<TableSkeleton />}>
          <EscrowRequestTable />
        </Suspense>
      </Card>
    </div>
  )
}