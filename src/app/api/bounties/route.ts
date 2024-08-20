import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const bounty = data.bounty;

  console.log('Bounty:', bounty);
  
  return NextResponse.json(
  { 
    message: "Bounty Set" 
  }, 
  {
    status: 200,
  });
}
