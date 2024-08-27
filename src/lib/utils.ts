import { LAMPORTS_PER_SOL } from "@solana/web3.js"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function lamportsToSol(sol: number) {
  return Math.round((sol / LAMPORTS_PER_SOL) * 100000) / 100000
}

export function createLinkToIssue(repo: string, issue: number) {
  const encodedRepo = encodeURIComponent(repo)
  return `https://github.com/${repo}/issues/${issue}`
}
