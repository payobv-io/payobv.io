"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';

const CustomWalletButton = () => {
  const { wallet, publicKey, connecting, connected, disconnecting, connect, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = useCallback(async () => {
    if (connected) {
      await disconnect();
    } else if (wallet) {
      await connect();
    } else {
      setVisible(true);
    }
  }, [connected, wallet, connect, disconnect, setVisible]);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <button 
      onClick={handleClick}
      disabled={connecting || disconnecting}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {connecting ? 'Connecting...' :
       connected ? `Disconnect ${publicKey?.toBase58().slice(0, 4)}...${publicKey?.toBase58().slice(-4)}` :
       wallet ? 'Connect' : 'Select Wallet'}
    </button>
  );
};

export default CustomWalletButton;