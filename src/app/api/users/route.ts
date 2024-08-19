import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';


export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const { username, email, role } = await req.json();
  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      role,
    },
  });
  return NextResponse.json(newUser, { status: 201 });
}
