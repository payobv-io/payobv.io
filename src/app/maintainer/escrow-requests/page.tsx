import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EscrowRequestTable from "@/components/ui/escrow-requests/table";
import WalletCard from "@/components/ui/escrow-requests/wallet-card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { WalletIcon } from "lucide-react";

// Wallet balance (this would typically come from your application state or an API call)
const walletBalance = 5000

export default function Page() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
      <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-gray-800">Escrow Requests</h1>
          {/* Wallet Balance Card */}
          <WalletCard />
        </div>

        <EscrowRequestTable />
      </div>
    </main>
  )
}