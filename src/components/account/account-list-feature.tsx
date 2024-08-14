'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { AppHero } from '../ui/ui-layout';
import { AccountBalance, AccountButtons } from './account-ui';

export default function AccountListFeature() {
  const { publicKey, connected } = useWallet();

  return (
    <>
      <div className="h-full flex flex-col">
        <div className="flex-grow mx-4 lg:mx-auto">
          <div className="hero py-[64px]">
            <div className="hero-content text-center">
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
          </div>
        </div>
      </div>
    </>
  );
}
