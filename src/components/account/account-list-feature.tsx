'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { AppHero } from '../ui/ui-layout';
import { AccountBalance } from './account-ui';

export default function AccountListFeature() {
  const { publicKey, connected } = useWallet();

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-grow mx-4 lg:mx-auto hero py-[64px] hero-content text-center">
          {connected ? (
            <div>
              <AppHero
                title={<AccountBalance address={publicKey!} />}
                subtitle={<div className="my-4"></div>}
              ></AppHero>
            </div>
          ) : null}

          <WalletButton />
        </div>
        <div className="hero-content text-center">
          <Button
            onClick={() => {
              signOut({ callbackUrl: '/' });
            }}
          >
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
