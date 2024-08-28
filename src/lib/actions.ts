'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { BountyStatus, db, RepositoryUserRole } from '@/db/db';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { getRepoNameFromFullName } from './utils';

interface WalletProps {
  publicAddress: string;
}

interface RoleProps {
  role: string;
}

interface AcceptBountyProps {
  bountyId: number;
  transactionSignature: string;
  escrowAddress: string;
}
interface ReleaseBountyProps {
  bountyId: number;
  transactionSignature: string;
}

export async function getServerSessionID(): Promise<number | null> {
  const session = await getServerSession(options);
  if (session) {
    const token = (session as any)?.token;
    return parseInt(token?.sub);
  }
  return null;
}

export async function checkRootPageAccess() {
  const userId = await getServerSessionID();

  if (userId) {
    const user = await findExistingUser(userId);
    const initialRepositoryRole = user?.initialRepositoryRole;

    if (initialRepositoryRole) {
      if (initialRepositoryRole === RepositoryUserRole.MAINTAINER) {
        return redirect('/maintainer/dashboard');
      } else {
        return redirect('/profile');
      }
    }
  }
}

export const findExistingUser = async (userId: number) => {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { wallets: true },
    });
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
};

export async function addWallet(props: WalletProps) {
  const isSamePublicAddress = await db.wallet.findUnique({
    where: { publicAddress: props.publicAddress },
  });
  const userID = await getServerSessionID();
  if (!isSamePublicAddress) {
    await db.wallet.create({
      data: {
        publicAddress: props.publicAddress,
        owner: {
          connect: { id: userID! },
        },
      },
    });
  }
}

export async function addRole(props: RoleProps) {
  var role;
  switch (props.role) {
    case 'contributor':
      role = RepositoryUserRole.CONTRIBUTOR;
      break;
    default:
      role = RepositoryUserRole.MAINTAINER;
      break;
  }
  const userID = await getServerSessionID();
  await db.user.update({
    where: { id: userID! },
    data: {
      initialRepositoryRole: role,
    },
  });
}

// This function returns the escrow detail to send to the github-app
async function getEscrowDetail(bountyId: number) {
  const bounty = await db.bounty.findUnique({
    where: { id: bountyId },
  });

  const user = await findExistingUser(bounty?.authorId!);
  const githubId = user?.githubId;
  const repository = await db.repository.findUnique({
    where: { id: bounty?.repositoryId },
  });

  if (!githubId || !repository || !bounty) {
    throw new Error('Failed to find githubId, repository, or bounty');
  }

  return {
    issueNumber: bounty.issueNumber,
    bounty: bounty.amount,
    owner: githubId,
    repo: getRepoNameFromFullName(repository.name),
    installationId: repository.installationId,
  };
}

/**
 * @param bountyId
 * @summary
 * This function accepts the bounty escrow request
 * 1. Fetch the escrow detail
 * 2. TODO: Check the wallet balance
 * 3. Send a fetch request to the github-app
 * 4. Update the bounty status to OPEN
 * 5. Add the transaction signature to the bounty table
 */
// TODO: Add a new field to the escrow table to store the escrow transaction signature

export async function acceptBountyEscrow({
  bountyId,
  transactionSignature,
  escrowAddress,
}: AcceptBountyProps) {
  try {
    const detail = await getEscrowDetail(bountyId);

    console.log('Escrow Detail: ', detail);

    await db.bounty.update({
      where: { id: bountyId },
      data: {
        status: BountyStatus.OPEN,
        escrow: {
          create: {
            accountAddress: escrowAddress,
            signature: transactionSignature,
          },
        },
      },
      include: {
        escrow: true,
      },
    });

    // Send fetch request to the github-app
    const response = await fetch(
      'http://localhost:3001/payobvio-github-app/escrow',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'approved',
          detail,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to approve bounty escrow');
    }

    const responseBody = await response.json();

    console.log('Approved bounty escrow:', responseBody);
    revalidatePath('/maintainer/escrow-requests');

    // TODO: Redirect to Dashboard
  } catch (error) {
    console.error('AcceptBountyEscrow Error: ', error);
    revalidatePath('/maintainer/escrow-requests');
  }
}

// TODO: Remove status field from escrow table
export async function releaseBountyEscrow({
  bountyId,
  transactionSignature,
}: ReleaseBountyProps) {
  try {
    await db.bounty.update({
      where: { id: bountyId },
      data: {
        status: BountyStatus.COMPLETED,
        signature: transactionSignature,
      },
    });

    revalidatePath('/maintainer/dashboard');
  } catch (error) {
    console.error('ReleaseBountyEscrow Error: ', error);
    revalidatePath('/maintainer/dashboard');
  }
}

/**
 * @param bountyId
 * @summary
 * This function rejects the bounty escrow request
 * 1. Fetch the escrow detail
 * 2. Send a fetch request to the github-app
 * 3. Update the bounty status to CANCELLED
 */
export async function rejectBountyEscrow(bountyId: number) {
  try {
    const detail = await getEscrowDetail(bountyId);

    // Send fetch request to the github-app
    const response = await fetch(
      'http://localhost:3001/payobvio-github-app/escrow',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'rejected',
          detail,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to reject bounty escrow');
    }

    const responseBody = await response.json();

    await db.bounty.update({
      where: { id: bountyId },
      data: {
        status: BountyStatus.CANCELLED,
      },
    });

    console.log('Rejected bounty escrow:', responseBody);
    revalidatePath('/maintainer/escrow-requests');

    // TODO: Redirect to Dashboard
  } catch (error) {
    console.error('RejectBountyEscrow Error: ', error);
  }
}
