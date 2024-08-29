import { BadgeProps } from '@/components/ui/badge';
import { BountyStatus } from '@prisma/client';

export const GITHUB_APP_API_BASE_URL = `${process.env.NEXT_PUBLIC_GITHUB_APP_SERVER_URL}/payobvio-github-app`;
export const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK as string;

export const bountyStatusDetails: {
  [key in BountyStatus]: {
    variant: BadgeProps['variant'];
    label: string;
  };
} = {
  OPEN: {
    variant: 'outline',
    label: 'OPEN',
  },
  PENDING_ESCROW: {
    variant: 'secondary',
    label: 'PENDING ESCROW',
  },
  RELEASING_ESCROW: {
    variant: 'primary',
    label: 'PROCESSING',
  },
  COMPLETED: {
    variant: 'success',
    label: 'PAID',
  },
  CANCELLED: {
    variant: 'alert',
    label: 'REJECTED',
  },
};

export const ENDPOINTS = {
  ESCROW: '/escrow',
  ESCROW_RELEASED: '/escrow-released',
}
