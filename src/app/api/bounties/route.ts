import { db } from '@/db/db';
import { bountyCreateSchema } from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';


// TODO: Use try/catch block to catch errors
export async function POST(req: NextRequest) {
  const responseData = await req.json();
  const parsedResponse = bountyCreateSchema.safeParse(responseData);

  if(!parsedResponse.success){
    console.error(parsedResponse.error)
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  const data = parsedResponse.data;
  
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
      title: data.title,
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

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const issueNumber = params.get('issueNumber');

  if(!issueNumber || isNaN(parseInt(issueNumber))){
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  try {
    const bounty = await db.bounty.findUnique({
      where: {
        issueNumber: parseInt(issueNumber)
      },
      select: {
        amount: true,
      }
    })
  
    if(!bounty){
      return NextResponse.json({
        isBounty: false,
        bounty: null
      });
    }
    
    console.log("Bounty Comment: ", bounty);
    return NextResponse.json({
      isBounty: true,
      bounty: bounty.amount
    });
  } catch (error) {
    console.error("Error checking bounty comment: ", error);
    return NextResponse.json(
    { message: "Error checking bounty comment" }, 
    { status: 500 });
  }
}
