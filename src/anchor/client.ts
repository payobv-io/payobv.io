import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Connection } from '@solana/web3.js';
import { PayobvioSolanaProgram } from './idl/idl';
import idl from './idl/idl.json';

const network = 'https://api.devnet.solana.com';

export const connection = new Connection(network, 'processed');

export function getProgram(wallet: any) {
  const provider = new AnchorProvider(connection, wallet, {
    preflightCommitment: 'processed',
  });
  const program = new Program(idl as PayobvioSolanaProgram, provider);

  return program;
}
