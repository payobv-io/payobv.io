'use client';

import { clusterApiUrl } from '@solana/web3.js';
import { createContext, ReactNode, useContext } from 'react';

export interface Cluster {
  name: string;
  endpoint: string;
  network?: ClusterNetwork;
  active?: boolean;
}

export enum ClusterNetwork {
  Mainnet = 'mainnet-beta',
  Testnet = 'testnet',
  Devnet = 'devnet',
  Custom = 'custom',
}

export const defaultClusters: Cluster[] = [
  {
    name: 'devnet',
    endpoint: clusterApiUrl(ClusterNetwork.Devnet),
    network: ClusterNetwork.Devnet,
  },
];

export interface ClusterProviderContext {
  cluster: Cluster;
}

const Context = createContext<ClusterProviderContext>(
  {} as ClusterProviderContext
);

export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = defaultClusters[0];

  const value: ClusterProviderContext = {
    cluster,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useCluster() {
  return useContext(Context);
}
