import { getOpenBounties } from '@/lib/data';
import { createLinkToIssue } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { Card } from '../../card';
import EmptyState from '../../empty-state';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../table';

export default async function OpenBountiesTable() {
  const openBounties = await getOpenBounties();

  return (
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
        {openBounties.length > 0 ? (
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
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <EmptyState
                message="No escrow requests found, start by creating a bounty in Github"
                icon={SearchIcon}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
