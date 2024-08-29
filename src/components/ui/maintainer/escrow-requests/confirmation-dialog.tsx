import { acceptBountyEscrow, rejectBountyEscrow } from '@/lib/actions';
import { initializeEscrowDeposit } from '@/lib/escrow-transactions';
import { EscrowRequestFromDb } from '@/lib/types';
import { createLinkToIssue } from '@/lib/utils';
import { useWallet } from '@solana/wallet-adapter-react';
import { CheckIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { SkewLoader } from 'react-spinners';
import { Button } from '../../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../dialog';
import { useToast } from '../../use-toast';

type DialogProps = {
  open: boolean;
  type?: 'accept' | 'reject';
  selectedRequest: EscrowRequestFromDb;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// TODO: Check the wallet balance before accepting the escrow request
export default function ConfirmationDialog({
  open,
  type,
  selectedRequest,
  setDialogOpen,
}: DialogProps) {
  const wallet = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleApproveRequest = async () => {
    setLoading(true);
    try {
      console.log(
        'Approving escrow request for issue #',
        selectedRequest.issueNumber
      );
      console.log('Getting Escrow Deposit Result');
      const escrowDepositResult = await initializeEscrowDeposit({
        wallet: wallet,
        issueRepoId: `${selectedRequest.issueNumber}_${selectedRequest.repositoryId}`,
        bountyAmount: selectedRequest.amount,
      });

      console.log('Escrow Deposit Result: ', escrowDepositResult);
      if (escrowDepositResult.transactionSignature) {
        await acceptBountyEscrow({
          bountyId: selectedRequest.id,
          transactionSignature: escrowDepositResult.transactionSignature!,
          escrowAddress: escrowDepositResult.escrowAddress.toString(),
        });
      } else {
        throw new Error(escrowDepositResult.errorMessage);
      }

      toast({
        title: 'Escrow Request Approved',
        description: `The escrow request for issue #${selectedRequest.issueNumber} has been approved.`,
        duration: 5000,
        variant: 'success',
      });
    } catch (error) {
      let errorMessage = 'Failed to approve escrow request';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);
      // Show error toast
      toast({
        title: 'Error',
        description: errorMessage,
        duration: 5000,
        variant: 'alert',
      });
    } finally {
      setDialogOpen(false);
      setLoading(false);
    }
  };

  const handleRejectRequest = () => {
    rejectBountyEscrow(selectedRequest.id);
    setDialogOpen(false);
    toast({
      title: 'Escrow Request Rejected',
      description: `The escrow request for issue #${selectedRequest.issueNumber} has been rejected.`,
      duration: 5000,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {type === 'accept' ? (
          <>
            <DialogHeader>
              <DialogTitle>Approve Escrow Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to approve this escrow request? This
                action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <RequestDetail request={selectedRequest} />
            <DialogFooter>
              <Button
                disabled={loading}
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApproveRequest}
                disabled={loading}
                className={`bg-green-600 text-white w-[113px] hover:bg-green-700 ${
                  loading ? 'disabled:opacity-80' : ''
                }`}
              >
                {loading ? (
                  <SkewLoader color="#ffffff" size={10} />
                ) : (
                  <>
                    <CheckIcon className="mr-2 h-4 w-4" /> <span>Approve</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reject Escrow Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to reject this escrow request? This action
                cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <RequestDetail request={selectedRequest} />
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleRejectRequest}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <XIcon className="mr-2 h-4 w-4" /> Reject
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function RequestDetail({ request }: { request: EscrowRequestFromDb }) {
  return (
    <div className="py-4">
      <p className="text-sm text-gray-500">
        Issue:{' '}
        <a
          href={createLinkToIssue(request.repository.name, request.issueNumber)}
          target="_blank"
          className="text-blue-600 hover:underline"
        >
          #{request.issueNumber}
        </a>
      </p>
      <p className="text-sm text-gray-500">
        Amount:{' '}
        <span className="font-medium text-gray-900">{request.amount} SOL</span>
      </p>
      <p className="text-sm text-gray-500">
        Repository:{' '}
        <span className="font-medium text-gray-900">
          {request.repository.name}
        </span>
      </p>
    </div>
  );
}
