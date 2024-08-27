import { getProgram } from '@/anchor/client';
import { BN, web3 } from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import { solToLamports } from './utils';

type InitEscrowProps = {
  wallet: any;
  issueId: number;
  bountyAmount: number;
};

type EscrowDepositResult = {
  escrowAddress: PublicKey;
  transactionSignature: string | null;
};

export async function initializeEscrowDeposit(
  props: InitEscrowProps
): Promise<EscrowDepositResult> {
  if (!props.wallet || !props.wallet.publicKey) {
    console.error('Wallet is not connected');
    return {
      escrowAddress: new PublicKey(0),
      transactionSignature: null,
    };
  }

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
