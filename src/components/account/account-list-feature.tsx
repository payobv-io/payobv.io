'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { AddWallet } from '@/lib/actions';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { AppHero } from '../ui/ui-layout';
import { AccountBalance, AccountButtons } from './account-ui';

export default function AccountListFeature() {
  const { publicKey, connected } = useWallet();

  const { data: session } = useSession();
  const token = (session as any)?.token;

  useEffect(() => {
    const createWallet = async () => {
      if (publicKey) {
        console.log('publicKey', publicKey);
        AddWallet({ publicAddress: publicKey.toString(), userID: token?.sub });
      }
    };

    createWallet();
  }, [publicKey, session, token]);



  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-grow mx-4 lg:mx-auto hero py-[64px] hero-content text-center">
          {connected ? (
            <div>
              <AppHero
                title={<AccountBalance address={publicKey!} />}
                subtitle={<div className="my-4"></div>}
              >
                <div className="my-4">
                  <AccountButtons address={publicKey!} />
                </div>
              </AppHero>
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
