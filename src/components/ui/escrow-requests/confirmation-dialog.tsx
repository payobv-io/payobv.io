import { acceptBountyEscrow, rejectBountyEscrow } from '@/lib/actions';
import { initializeEscrowDeposit } from '@/lib/escrow-transactions';
import { useWallet } from "@solana/wallet-adapter-react";
import { EscrowRequestFromDb } from '@/lib/types';
import { CheckIcon, XIcon } from 'lucide-react';
import { Button } from '../button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../dialog';
import { useToast } from '../use-toast';

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
  const {toast} = useToast();

  const handleApproveRequest = async () => {
    try {
      const escrowDepositResult = await initializeEscrowDeposit(
        {
          wallet: wallet,
          issueId: selectedRequest.issueNumber,
          bountyAmount: selectedRequest.amount,
        }
      );

      if (escrowDepositResult.transactionSignature) {
        await acceptBountyEscrow({
          bountyId: selectedRequest.id,
          transactionSignature:
            escrowDepositResult.transactionSignature!,
          escrowAddress:
            escrowDepositResult.escrowAddress.toString(),
        });
      }

      // Close the dialog and show success toast
      setDialogOpen(false);
      toast({
        title: 'Escrow Request Approved',
        description: `The escrow request for issue #${selectedRequest.issueNumber} has been approved.`,
        duration: 5000,
        variant: 'success',
      })
    } catch (error) {
      let errorMessage = 'Failed to approve escrow request';
      if(error instanceof Error) {
        errorMessage = error.message;
      }
      console.error(errorMessage);

      // Show error toast
      toast({
        title: 'Error',
        description: errorMessage,
        duration: 5000,
        variant: 'alert',
      })
    }
  }

  const handleRejectRequest = () => {
    rejectBountyEscrow(selectedRequest.id);
    setDialogOpen(false);
    toast({
      title: 'Escrow Request Rejected',
      description: `The escrow request for issue #${selectedRequest.issueNumber} has been rejected.`,
      duration: 5000,
    })
  }

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
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApproveRequest}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckIcon className="mr-2 h-4 w-4" /> Approve
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
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
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
        <span className="font-medium text-gray-900">{request.issueNumber}</span>
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
