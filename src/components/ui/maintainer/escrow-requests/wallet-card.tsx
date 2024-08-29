'use client';

import { useGetBalance } from '@/components/account/account-data-access';
import { lamportsToSol } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { RefreshCw, WalletIcon } from 'lucide-react';
import { Card, CardContent } from '../../card';

export default function WalletCard() {
  const { publicKey } = useWallet();
  const query = useGetBalance({ address: publicKey! });

  return (
    <Card>
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center gap-x-4">
          <WalletIcon className="text-blue-500" />
          <div className="flex gap-x-2 items-center">
            <p className="font-bold text-gray-900">
              {query.data ? lamportsToSol(query.data) : '...'} SOL
            </p>
            <RefreshCw
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                query.refetch();
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
