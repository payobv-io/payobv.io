import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import SessionWrapper from '@/context/session-wrapper';
import { cn } from '@/lib/utils';
import { Inter as FontSans } from 'next/font/google';
import './global.css';
import { ReactQueryProvider } from './react-query-provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  manifest: '/manifest.json',
  title: 'payobv-io',
  description: 'Generated by create-solana-dapp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <SessionWrapper>
          <ReactQueryProvider>
            <ClusterProvider>
              <SolanaProvider>{children}</SolanaProvider>
              <Toaster />
            </ClusterProvider>
          </ReactQueryProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
