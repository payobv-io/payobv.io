import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { Card } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { getEscrowRequests } from "@/lib/data";
import TableAction from "./table-action";
import { createLinkToIssue } from "@/lib/utils";

export default async function EscrowRequestTable() {
  const session = await getServerSession(options);
  const userId = parseInt((session as any)?.token?.sub);

  if (!session || !userId) {
    return null;
  }
  
  const escrowRequests = await getEscrowRequests(userId);

  return (
    <>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Issue</TableHead>
              <TableHead>Repository</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Requested</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {escrowRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium w-[400px]">
                  <a href={createLinkToIssue(request.repository.name, request.issueNumber)} className="text-blue-600 hover:underline">{request.title}</a>
                </TableCell>
                <TableCell>{request.repository.name}</TableCell>
                <TableCell>{request.amount} SOL</TableCell>
                <TableCell>{request.createdAt.toDateString()}</TableCell>
                <TableCell>
                  <TableAction request={request} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  )
}