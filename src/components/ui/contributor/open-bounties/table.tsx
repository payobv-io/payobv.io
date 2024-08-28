import { getServerSessionID } from '@/lib/actions';
import { getEscrowRequests, getOpenBounties } from '@/lib/data';
import { createLinkToIssue } from '@/lib/utils';
import { Card } from '../../card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../table';
import { SearchIcon } from 'lucide-react';
import EmptyState from '../../empty-state';

export default async function EscrowRequestTable() {

  const openBounties = await getOpenBounties();

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[400px]">Issue</TableHead>
            <TableHead>Repository</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
          openBounties.length > 0 ?
            openBounties.map((request) => (
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
              </TableRow>
            ))
          : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <EmptyState
                  message="No escrow requests found, start by creating a bounty in Github" 
                  icon={SearchIcon}
                />
              </TableCell>
            </TableRow>
          )
        }
        </TableBody>
      </Table>
    </Card>
  );
}
