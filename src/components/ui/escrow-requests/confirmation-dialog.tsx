import { getProgram } from '@/anchor/client';
import { acceptBountyEscrow, rejectBountyEscrow } from '@/lib/actions';
import { EscrowRequestFromDb } from '@/lib/types';
import { solToLamports } from '@/lib/utils';
import { BN, web3 } from '@coral-xyz/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
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

type InitEscrowProps = {
  wallet: any;
  issueId: number;
  bountyAmount: number;
};

type EscrowDepositResult = {
  escrowAddress: PublicKey;
  transactionSignature: string | null;
};

async function InitializeEscrowDeposit(
  props: InitEscrowProps
): Promise<EscrowDepositResult> {
  const program = getProgram(props.wallet);
  const [escrowAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from('escrow'), Buffer.from(props.issueId.toString())],
    program.programId
  );

  let escrowAccountExists;

  try {
    // Check if escrow account exists
    escrowAccountExists = await program.account.escrowAccount.fetch(
      escrowAccount
    );
    console.log('Escrow account already exists', escrowAccountExists);
  } catch (error: any) {
    if (!error.message.includes('Account does not exist')) {
      console.error('Unexpected error while checking escrow account:', error);
      escrowAccountExists = false;
      throw error;
    }
  }

  const bountyAmountLamports = new BN(solToLamports(props.bountyAmount));
  const commonAccounts = {
    maintainer: props.wallet.publicKey,
    escrowAccount: escrowAccount,
    systemProgram: web3.SystemProgram.programId,
  };

  try {
    let depositTx: string | null = null;
    if (!escrowAccountExists) {
      // Initialize the escrow account
      const initTx = await program.methods
        .initializeEscrow(bountyAmountLamports, props.issueId.toString())
        .accounts(commonAccounts)
        .rpc();
      console.log('Initialize transaction signature:', initTx);
    }

    const escrowAccountDetails = await program.account.escrowAccount.fetch(
      escrowAccount
    );

    if (escrowAccountDetails!.state.funded === undefined) {
      // Deposit funds into the escrow account
      depositTx = await program.methods
        .depositFunds(bountyAmountLamports)
        .accounts(commonAccounts)
        .rpc();
      console.log('Deposit transaction signature:', depositTx);
      console.log('Funds deposited successfully');
    }

    return {
      escrowAddress: escrowAccount,
      transactionSignature: depositTx,
    };
  } catch (err: any) {
    if (err instanceof Error) {
      if (err.message.includes('User rejected the request')) {
        console.log('Transaction was rejected by the user');
        // TODO: Handle transaction rejection (show toast or alert)
        return {
          escrowAddress: escrowAccount,
          transactionSignature: null,
        };
      }
    }

    console.error('Error during escrow initialization or fund deposit:', err);
    throw err;
  }
}

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
