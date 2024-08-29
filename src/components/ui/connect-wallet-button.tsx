'use client';

import { addWallet } from '@/lib/actions';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { WalletIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Button } from './button';

export default function ConnectWalletButton() {
  const { wallet, connected, connect, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const handleConnectWallet = async () => {
    if (connected) {
      await disconnect();
    } else if (wallet) {
      await connect();
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (connected) {
        await addWallet({
          publicAddress: publicKey!.toString(),
        });
      }
    };

    handleWalletConnection();
  }, [connected, publicKey]);

  return (
    <Button
      variant="outline"
      onClick={handleConnectWallet}
      className="flex items-center gap-x-2"
    >
      <WalletIcon className="h-5 w-5" />
      <span>{connected ? 'Wallet Connected' : 'Connect Wallet'}</span>
      {connected ? (
        <span className="top-1/2 transform-translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></span>
      ) : undefined}
    </Button>
  );
}
