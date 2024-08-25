import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const installation_id = searchParams.get('installation_id');
  const setup_action = searchParams.get('setup_action');

  const redirectUrl = `${req.nextUrl.origin}/maintainer/dashboard`;

  return NextResponse.redirect(redirectUrl);
}
