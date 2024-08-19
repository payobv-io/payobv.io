'use client';

import { connection, getProgram } from '@/anchor/client';
import { web3 } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useState } from 'react';

export default function ContractInteraction() {
  const wallet = useWallet();
  const [message, setMessage] = useState<string>('');
  const [pda, setPda] = useState<string>('');

  const handleClick = async () => {
    if (!wallet || !wallet.publicKey) {
      console.error('Wallet is not connected');
      return;
    }

    const program = getProgram(wallet);

    const [pda] = await PublicKey.findProgramAddressSync(
      [Buffer.from('data_account'), wallet.publicKey.toBuffer()],
      program.programId
    );

    console.log(`PDA: ${pda.toString()}`);

    const accountInfo = await connection.getAccountInfo(pda);
    if (!accountInfo) {
      console.log(
        `Account does not exist at PDA: ${pda.toString()}. Creating account...`
      );
      const message = 'Hello, Solana!';
      await program.methods
        .initialize(message)
        .accounts({
          dataAccount: pda,
          user: wallet.publicKey,
          systemProgram: web3.SystemProgram.programId,
        } as any)
        .rpc();
      console.log(`Account created at PDA: ${pda.toString()}`);
    }

    const account = await program.account.dataAccount.fetch(pda);

    setMessage(account.message);
    setPda(pda.toString());
  };

  return (
    <div>
      {wallet.publicKey && (
        <button onClick={handleClick}>Get Message and PDA</button>
      )}
      {message && (
        <div>
          <p>Message: {message}</p>
          <p>PDA: {pda}</p>
        </div>
      )}
    </div>
  );
}
