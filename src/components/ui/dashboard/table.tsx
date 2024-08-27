import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecentBounties } from "@/lib/data";
import { Badge, BadgeProps } from "../badge";
import { BountyStatus } from "@prisma/client";
import { createLinkToIssue } from "@/lib/utils";

type BountyTableProps = React.ComponentPropsWithRef<"table"> &
{
  userId: number
}

const bountyVariants: {
  [key in BountyStatus]: BadgeProps["variant"]
} = {
  "OPEN" : "default",
  "PENDING_ESCROW" : "secondary",
  "COMPLETED" : "success",
  "CANCELLED" : "alert",
}

export default async function BountyTable({
  userId,
  ...props
}: BountyTableProps) {
  const bounties = await getRecentBounties(userId)

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead>Issue</TableHead>
          <TableHead>Repository</TableHead>
          <TableHead>Contributor</TableHead>
          <TableHead>Bounty</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bounties.map((bounty) => (
          <TableRow key={bounty.id}>
            <TableCell className="font-medium">
              <a 
                href={createLinkToIssue(bounty.repository.name, bounty.issueNumber)} 
                className="text-blue-600 hover:underline"
                target="_blank"
              >{bounty.title}</a>
            </TableCell>
            <TableCell>{bounty.repository.name}</TableCell>
            <TableCell>{bounty.receiver?.githubId ?? "-"}</TableCell>
            <TableCell>{bounty.amount} SOL</TableCell>
            <TableCell>
              <Badge variant={bountyVariants[bounty.status]}>
                {bounty.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}