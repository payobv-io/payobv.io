import { createNodeMiddleware, createProbot } from 'probot';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  // Use regex to access the numbers from a data.comment
  const { issue, comment } = data;

  if(issue.user.login !== comment.user.login){
    return NextResponse.json(
      {error: "Only the issue creator can add a bounty to the issue"},
      {status: 401}
    );
  }
  
  const bounty = handleBountyFetch(comment.body);
  const message = bounty ? `Bounty of $${bounty} added to issue` : "";
  return NextResponse.json({ message });
}

function handleBountyFetch(comment: string){
  // Use regex to access the numbers from a data.comment which starts with "Bounty "
  const regex = /(?<=^Bounty\s+)\d+/g
  const bounty = comment.match(regex);
  if(!bounty){
    return 0;
  }
  return Number.parseFloat(bounty[0]);
}



