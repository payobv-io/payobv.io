import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { bountyStatusDetails } from '@/lib/constants';
import { getRecentBounties } from '@/lib/data';
import { createLinkToIssue } from '@/lib/utils';
import { BountyStatus } from '@prisma/client';
import { SearchIcon } from 'lucide-react';
import { Badge } from '../../badge';
import EmptyState from '../../empty-state';
import ReleaseConfirmButton from './release-confirm-button';

type BountyTableProps = React.ComponentPropsWithRef<'table'> & {
  userId: number;
};

export default async function BountyTable({
  userId,
  ...props
}: BountyTableProps) {
  const bounties = await getRecentBounties(userId);

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead>Repository</TableHead>
          <TableHead>Contributor</TableHead>
          <TableHead>Bounty</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bounties.length > 0 ? (
          bounties.map((bounty) => (
            <TableRow key={bounty.id}>
              <TableCell className="font-medium">
                <a
                  href={createLinkToIssue(
                    bounty.repository.name,
                    bounty.issueNumber
                  )}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >
                  {bounty.title}
                </a>
              </TableCell>
              <TableCell>{bounty.repository.name}</TableCell>
              <TableCell>{bounty.receiver?.githubId ?? '-'}</TableCell>
              <TableCell>{bounty.amount} SOL</TableCell>
              <TableCell className="text-center">
                <Badge variant={bountyStatusDetails[bounty.status].variant}>
                  {bountyStatusDetails[bounty.status].label}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {bounty.status === BountyStatus.RELEASING_ESCROW ? (
                  <ReleaseConfirmButton
                    bountyId={bounty.id}
                    issueRepoId={`${bounty.issueNumber}_${bounty.repositoryId}`}
                    bountyAmount={bounty.amount}
                    contributorId={bounty.receiverId!}
                  />
                ) : (
                  '-'
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <EmptyState
                message="No recent bounties found"
                icon={SearchIcon}
              />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
