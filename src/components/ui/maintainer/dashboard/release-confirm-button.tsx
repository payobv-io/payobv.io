'use client';

import { releaseBountyEscrow } from '@/lib/actions';
import { releaseEscrowFund } from '@/lib/escrow-transactions';
import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from '../../button';
import { useToast } from '../../use-toast';
import { useState } from 'react';
import { SkewLoader } from 'react-spinners';

type ReleaseConfirmButtonProps = {
  bountyId: number;
  issueRepoId: string;
  bountyAmount: number;
  contributorId: number;
};

const ReleaseConfirmButton = (props: ReleaseConfirmButtonProps) => {
  const wallet = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  return (
    <Button
      onClick={async () => {
        try {
          setLoading(true);
          const releaseEscrowFundResult = await releaseEscrowFund({
            wallet: wallet,
            issueRepoId: props.issueRepoId,
            bountyAmount: props.bountyAmount,
            contributorId: props.contributorId,
          });

          if (releaseEscrowFundResult) {
            await releaseBountyEscrow({
              bountyId: props.bountyId,
              transactionSignature:
                releaseEscrowFundResult.transactionSignature!,
            });
          }
          console.log('Escrow released:', releaseEscrowFundResult);
        } catch (error) {
          let errorMessage = 'Failed to release the escrow';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          console.error(errorMessage);
          toast({
            title: 'Error',
            description: errorMessage,
            duration: 5000,
            variant: 'alert',
          });
        }
        finally {
          setLoading(false);
        }
      }}
      size="sm"
      variant="outline"
      className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 text-sm"
    >
      {
        loading 
        ? <SkewLoader
            color="#16a34a"
            size={10}
          />
        : 
        <span>Confirm Release</span>
      }
    </Button>
  );
};

export default ReleaseConfirmButton;
