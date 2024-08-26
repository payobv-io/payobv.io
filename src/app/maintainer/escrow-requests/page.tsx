import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { WalletIcon } from "lucide-react";

// Wallet balance (this would typically come from your application state or an API call)
const walletBalance = 5000

const escrowRequests = [
  {
    id: 1,
    issue: "Implement dark mode",
    repo: "acme/ui-library",
    amount: "$500",
    dateRequested: "2023-06-20",
    status: "Pending"
  },
  {
    id: 2,
    issue: "Fix memory leak in worker",
    repo: "acme/backend-service",
    amount: "$750",
    dateRequested: "2023-06-19",
    status: "Pending"
  },
  {
    id: 3,
    issue: "Add multi-language support",
    repo: "acme/frontend-app",
    amount: "$1000",
    dateRequested: "2023-06-18",
    status: "Approved"
  },
  {
    id: 4,
    issue: "Optimize database queries",
    repo: "acme/data-layer",
    amount: "$600",
    dateRequested: "2023-06-17",
    status: "Pending"
  },
  {
    id: 5,
    issue: "Implement OAuth2 authentication",
    repo: "acme/auth-service",
    amount: "$800",
    dateRequested: "2023-06-16",
    status: "Rejected"
  },
] as const

const getStatusColor = (status: "Pending" | "Approved" | "Rejected") => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800'
    case 'Approved': return 'bg-green-100 text-green-800'
    case 'Rejected': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

export default function Page() {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
          <div className="container mx-auto px-6 py-8 flex flex-col gap-y-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-semibold text-gray-800">Escrow Requests</h1>
              {/* Wallet Balance Card */}
              <Card>
                <CardContent className="flex items-center justify-between p-3">
                  <div className="flex items-center">
                    <WalletIcon className="text-blue-500 mr-4" />
                    <p className="font-bold text-gray-900">{walletBalance.toLocaleString()} SOL</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Issue</TableHead>
                    <TableHead>Repository</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {escrowRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">
                        <a href="#" className="text-blue-600 hover:underline">{request.issue}</a>
                      </TableCell>
                      <TableCell>{request.repo}</TableCell>
                      <TableCell>{request.amount}</TableCell>
                      <TableCell>{request.dateRequested}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className={getStatusColor(request.status)}>
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {request.status === 'Pending' && (
                          <div className="flex space-x-2 justify-center">
                            <Button size="sm" variant="outline" className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700">
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700">
                              Reject
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </main>
  )
}