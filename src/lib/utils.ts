import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
  return `https://github.com/${repo}/issues/${issue}`
}

export function getRepoNameFromFullName(fullname: string) {
  return fullname.split('/').at(-1);
}

export function createSolanaExplorerLink(signature: string) {
  return `https://explorer.solana.com/tx/${signature}`;
}
