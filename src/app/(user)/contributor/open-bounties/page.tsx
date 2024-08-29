import { Card } from "@/components/ui/card";
import OpenBountiesTable from "@/components/ui/contributor/open-bounties/table";
import { TableSkeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Open Bounties</h1>

      <Card>
        <Suspense fallback={<TableSkeleton />}>
          <OpenBountiesTable />
        </Suspense>
      </Card>
    </div>
  );
}
