import { db } from '@/db/db';
import { bountyCreateSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

// TODO: Use try/catch block to catch errors
export async function POST(req: NextRequest) {
  const responseData = await req.json();
  const parsedResponse = bountyCreateSchema.safeParse(responseData);

  if (!parsedResponse.success) {
    console.error(parsedResponse.error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const data = parsedResponse.data;

  // Create Bounty Record
  const bounty = await db.bounty.create({
    data: {
      author: {
        connect: { id: data.authorId },
      },
      repository: {
        connect: { id: data.repositoryId },
      },
      issueNumber: data.issueNumber,
      title: data.title,
      amount: data.bounty,
    },
  });

  if (!bounty) {
    return NextResponse.json(
      { message: 'Failed to create bounty' },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: 'Bounty Set' }, { status: 200 });
}
