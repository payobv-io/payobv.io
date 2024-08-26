'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { BountyStatus, db, RepositoryUserRole } from '@/db/db';
import { getServerSession } from 'next-auth';
import { EscrowRequestFromDb } from './types';
import { revalidatePath } from 'next/cache';

interface WalletProps {
  publicAddress: string;
}

interface RoleProps {
  role: string;
}

async function getUserSessionID() {
  const session = await getServerSession(options);
  const token = (session as any)?.token;
  return token?.sub;
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

export async function AddWallet(props: WalletProps) {
  const isSamePublicAddress = await db.wallet.findUnique({
    where: { publicAddress: props.publicAddress },
  });
  const userID = await getUserSessionID();
  if (!isSamePublicAddress) {
    await db.wallet.create({
      data: {
        publicAddress: props.publicAddress,
        owner: {
          connect: { id: parseInt(userID) },
        },
      },
    });
  }
}

export async function AddRole(props: RoleProps) {
  var role;
  switch (props.role) {
    case 'contributor':
      role = RepositoryUserRole.CONTRIBUTOR;
      break;
    default:
      role = RepositoryUserRole.MAINTAINER;
      break;
  }
  const userID = await getUserSessionID();
  await db.user.update({
    where: { id: parseInt(userID) },
    data: {
      initialRepositoryRole: role,
    },
  });
}

// This function returns the escrow detail to send to the github-app
async function getEscrowDetail(bountyId: number){
  const bounty = await db.bounty.findUnique({
    where: { id: bountyId }
  })

  const user = await db.user.findUnique({
    where: { id: bounty?.authorId },
  })
  const githubId = user?.githubId;
  const repository = await db.repository.findUnique({
    where: { id: bounty?.repositoryId }
  })

  if(!githubId || !repository || !bounty){
    throw new Error("Failed to find githubId, repository, or bounty");
  }

  return {
    issueNumber: bounty.issueNumber,
    bounty: bounty.amount,
    owner: githubId,
    repo: repository.name,
    installationId: repository.installationId
  }
}

// TODO: Add Escrow Logic
/**
 * @param bountyId
 * @summary
 * This function accepts the bounty escrow request
 * 1. Fetch the escrow detail
 * 2. TODO: Check the wallet balance
 * 3. Send a fetch request to the github-app
 * 4. Update the bounty status to OPEN
 */
export async function acceptBountyEscrow(bountyId: number) {
  try {
    const detail = await getEscrowDetail(bountyId);

    // Send fetch request to the github-app
    const response = await fetch("http://localhost:3001/payobvio-github-app/escrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "approved",
        detail
      })
    })
  
    if (!response.ok) {
      throw new Error("Failed to approve bounty escrow");
    }
  
    const responseBody = await response.json();

    await db.bounty.update({
      where: { id: bountyId },
      data: {
        status: BountyStatus.OPEN
      }
    })

    console.log("Approved bounty escrow:", responseBody);
    revalidatePath("/maintainer/escrow-requests");

    // TODO: Redirect to Dashboard
  } catch (error) {
    console.error("AcceptBountyEscrow Error: ", error);
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
    const response = await fetch("http://localhost:3001/payobvio-github-app/escrow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        action: "rejected",
        detail
      })
    })
  
    if (!response.ok) {
      throw new Error("Failed to reject bounty escrow");
    }
  
    const responseBody = await response.json();

    await db.bounty.update({
      where: { id: bountyId },
      data: {
        status: BountyStatus.CANCELLED
      }
    })

    console.log("Rejected bounty escrow:", responseBody);
    revalidatePath("/maintainer/escrow-requests");

    // TODO: Redirect to Dashboard
}
  catch (error) {
    console.error("RejectBountyEscrow Error: ", error);
  }
}
