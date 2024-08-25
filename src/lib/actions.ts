'use server';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { db, RepositoryUserRole } from '@/db/db';
import { getServerSession } from 'next-auth';

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
