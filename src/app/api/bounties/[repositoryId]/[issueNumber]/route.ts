import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    repositoryId: string
    issueNumber: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  // Access the issueNumber from the request parameters: api/bounties/[issueNumber]
  const { issueNumber, repositoryId } = params;

  if(!issueNumber || isNaN(parseInt(issueNumber))){
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  try {
    const bounty = await db.bounty.findUnique({
      where: {
        issueNumber_repositoryId: {
          issueNumber: parseInt(issueNumber),
          repositoryId: parseInt(repositoryId)
        }
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