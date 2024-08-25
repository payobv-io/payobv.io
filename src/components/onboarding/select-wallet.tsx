'use client';

import { AddWallet } from '@/lib/actions';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { motion } from 'framer-motion';
import { ArrowRightIcon, WalletIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export const SelectWallet = () => {
  const router = useRouter();
  const { wallet, connected, connect, disconnect, publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const [isHovered, setIsHovered] = useState(false);

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
        await AddWallet({
          publicAddress: publicKey!.toString(),
        });
        router.push('/?type=select-role');
      }
    };

    handleWalletConnection();
  }, [connected, publicKey]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mb-8">
        <WalletIcon className="h-16 w-16 text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 text-center">
          Connect Your Wallet
        </h1>
      </div>
      <p className="text-gray-600 text-center mb-8">
        Link your cryptocurrency wallet to manage bounties, receive payments,
        and track your earnings securely.
      </p>
      <motion.div
        className="relative mb-8"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <Button
          onClick={handleConnectWallet}
          className="w-full py-6 text-lg font-semibold"
        >
          <WalletIcon className="h-5 w-5 mr-2" />
          {connected ? 'Connecting wallet ...' : 'Connect Wallet'}
          <ArrowRightIcon className="h-5 w-5 ml-2" />
        </Button>
        <motion.div
          className="absolute inset-0 bg-blue-100 rounded-lg z-[-1]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <p className="text-xs text-gray-500 text-center mb-8">
        We support various wallet providers. Choose your preferred wallet on the
        next screen.
      </p>
    </>
  );
};
