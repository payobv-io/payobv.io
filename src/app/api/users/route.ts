import { NextRequest, NextResponse } from 'next/server';
import db from '../../../db/db';


export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { username, email, role } = await req.json();
  const newUser = await db.user.create({
    data: {
      username,
      email,
      role,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
