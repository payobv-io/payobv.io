import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getContributedBountyDetails } from "@/lib/data";
import { createLinkToIssue, createSolanaExplorerLink } from "@/lib/utils";
import EmptyState from "../../empty-state";
import { SearchIcon } from "lucide-react";
import { bountyStatusDetails } from "@/lib/constants";
import { Badge } from "../../badge";

type BountyTableProps = React.ComponentPropsWithRef<"table"> &
{
  userId: number
}

export default async function BountyTable({
  userId,
  ...props
}: BountyTableProps) {
  const bounties = await getContributedBountyDetails(userId)

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead>Repository</TableHead>
          <TableHead>Bounty</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead>Transaction Signature</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          bounties.length > 0 ?
          bounties.map((bounty) => (
            <TableRow key={bounty.id}>
              <TableCell className="font-medium">
                <a 
                  href={createLinkToIssue(bounty.repository.name, bounty.issueNumber)} 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >{bounty.title}</a>
              </TableCell>
              <TableCell>{bounty.repository.name}</TableCell>
              <TableCell>{bounty.amount} SOL</TableCell>
              <TableCell className="text-center">
                <Badge variant={bountyStatusDetails[bounty.status].variant}>
                  {bountyStatusDetails[bounty.status].label}
                </Badge>
              </TableCell>
              {/* TODO: Make this a solana explorer link */}
              <TableCell>
                <a 
                  href={createSolanaExplorerLink(bounty.signature)} 
                  className="text-blue-600 hover:underline"
                  target="_blank"
                >{bounty.signature}</a>
              </TableCell>
            </TableRow>
          ))
        : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <EmptyState
                message="No bounties found" 
                icon={SearchIcon}
              />
            </TableCell>
          </TableRow>
        )

        }
      </TableBody>
    </Table>
  )
}