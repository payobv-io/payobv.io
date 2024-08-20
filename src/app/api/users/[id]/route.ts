import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';


type Params = {
  id: string;
};


export async function GET(req: NextRequest, { params }: { params: Params }) {
  const user = await prisma.user.findUnique({
    where: { user_id: Number(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}


export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const { username, email, role } = await req.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { user_id: Number(params.id) },
      data: {
        username,
        email,
        role,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    await prisma.user.delete({
      where: { user_id: Number(params.id) },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
