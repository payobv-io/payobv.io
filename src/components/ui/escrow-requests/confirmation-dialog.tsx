import { acceptBountyEscrow, rejectBountyEscrow } from '@/lib/actions';
import { InitializeEscrowDeposit } from '@/lib/escrow-transactions';
import { EscrowRequestFromDb } from '@/lib/types';
import { useWallet } from '@solana/wallet-adapter-react';
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

type DialogProps = {
  open: boolean;
  type?: 'accept' | 'reject';
  selectedRequest?: EscrowRequestFromDb;
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
            {selectedRequest ? (
              <>
                <RequestDetail request={selectedRequest} />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      const escrowDepositResult = await InitializeEscrowDeposit(
                        {
                          wallet: wallet,
                          issueId: selectedRequest.issueNumber,
                          bountyAmount: selectedRequest.amount,
                        }
                      );

                      if (escrowDepositResult.transactionSignature) {
                        acceptBountyEscrow({
                          bountyId: selectedRequest.id,
                          transactionSignature:
                            escrowDepositResult.transactionSignature!,
                          escrowAddress:
                            escrowDepositResult.escrowAddress.toString(),
                        });
                      }

                      setDialogOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <CheckIcon className="mr-2 h-4 w-4" /> Approve
                  </Button>
                </DialogFooter>
              </>
            ) : undefined}
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
            {selectedRequest ? (
              <>
                <RequestDetail request={selectedRequest} />
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      rejectBountyEscrow(selectedRequest.id);
                      setDialogOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <XIcon className="mr-2 h-4 w-4" /> Reject
                  </Button>
                </DialogFooter>
              </>
            ) : undefined}
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
