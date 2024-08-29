import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SOLANA_NETWORK } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lamportsToSol(sol: number) {
  return Math.round((sol / LAMPORTS_PER_SOL) * 100000) / 100000;
}

export function solToLamports(sol: number) {
  return sol * LAMPORTS_PER_SOL;
}

export function createLinkToIssue(repo: string, issue: number) {
  return `https://github.com/${repo}/issues/${issue}`;
}

export function getRepoNameFromFullName(fullname: string): string {
  return fullname.split('/').at(-1) ?? fullname;
}

export function createSolanaExplorerLink(signature: string, cluster: string = SOLANA_NETWORK) {
  return `https://explorer.solana.com/tx/${signature}?cluster=${cluster}`;
}
