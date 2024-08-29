import EscrowRequestTable from '@/components/ui/maintainer/escrow-requests/table';

export default function Page() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">Bounties</h1>

        <EscrowRequestTable />
      </div>
    </main>
  );
}
