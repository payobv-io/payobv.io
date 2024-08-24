import db from '@/db/db';
import { bountyCreateSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const response = bountyCreateSchema.safeParse(req.body);

  if(!response.success){
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  const data = response.data;
  
  // Create Bounty Record
  const bounty = await db.bounty.create({
    data: {
      author: {
        connect: { id: data.authorId }
      },
      repository: {
        connect: { id: data.repositoryId }
      },
      issueNumber: data.issueNumber,
      amount: data.bounty
    }
  });

  if(!bounty){
    return NextResponse.json(
      { message: "Failed to create bounty" }, 
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Bounty Set" }, 
    { status: 200 }
  );
}
