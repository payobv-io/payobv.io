import { NextResponse } from 'next/server';

export function GET() {
  const installationUrl = `https://github.com/apps/payobvio-github-app/installations/new`;

  return NextResponse.redirect(installationUrl);
}
