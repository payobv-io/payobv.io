import { BountyStatus, db } from '@/db/db';
import { bountyReleaseSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const responseData = await req.json();
  const parsedResponse = bountyReleaseSchema.safeParse(responseData);

  if (!parsedResponse.success) {
    console.error(parsedResponse.error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const data = parsedResponse.data;

  // Update Bounty Record
  // TODO: Update the bounty status enum to include a new status for processing
  // TODO: Update the bounty table to make issueNumber and repositoryId a unique key
  const updateBounty = await db.bounty.update({
    where: { issueNumber: data.issueNumber, repositoryId: data.repositoryId },
    data: {
      status: BountyStatus.PROCESSING,
      receiverId: data.receiverId,
      pullRequestNumber: data.pullRequestNumber,
    },
  });

  if (!updateBounty) {
    return NextResponse.json(
      { message: 'Failed to update bounty' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Bounty updated' }, { status: 200 });
}
