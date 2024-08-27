import { getServerSessionID } from '@/lib/actions';
import { getEscrowRequests } from '@/lib/data';
import { createLinkToIssue } from '@/lib/utils';
import { Card } from '../card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import TableAction from './table-action';

export default async function EscrowRequestTable() {
  const userID = await getServerSessionID();

  if (!userID) {
    return null;
  }

  const escrowRequests = await getEscrowRequests(userID);

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
                  <a
                    href={createLinkToIssue(
                      request.repository.name,
                      request.issueNumber
                    )}
                    target="_blank"
                    className="text-blue-600 hover:underline"
                  >
                    {request.title}
                  </a>
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
  );
}
