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

  try {
    const updateBounty = await db.bounty.update({
      where: {
        issueNumber_repositoryId: {
          issueNumber: data.issueNumber,
          repositoryId: data.repositoryId,
        },
      },
      data: {
        status: BountyStatus.RELEASING_ESCROW,
        receiverId: data.authorId,
        pullRequestNumber: data.pullRequestNumber,
      },
    });

    if (!updateBounty) {
      return NextResponse.json(
        { message: 'Failed to update bounty' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Bounty updated', bounty: updateBounty.amount },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating bounty to RELEASE ESCROW: ', error);
    return NextResponse.json(
      { message: 'Failed to update bounty' },
      { status: 500 }
    );
  }
}
