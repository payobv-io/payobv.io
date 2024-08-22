import db from '@/db/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(context: any) {
  const { params } = context;
  const user = await db.user.findUnique({
    where: { user_id: Number(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, context: any) {
  const { params } = context;
  const { username, email, role } = await req.json();

  try {
    const updatedUser = await db.user.update({
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

export async function DELETE(context: any) {
  const { params } = context;
  try {
    await db.user.delete({
      where: { user_id: Number(params.id) },
    });

    return NextResponse.json(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}
