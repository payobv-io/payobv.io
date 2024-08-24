'use server';

import db from '@/db/db';

interface WalletProps {
  publicAddress: string;
  userID: string;
}

export async function AddWallet(props: WalletProps) {
  const isSamePublicAddress = await db.wallet.findUnique({
    where: { publicAddress: props.publicAddress },
  });

  if (!isSamePublicAddress) {
    await db.wallet.create({
      data: {
        publicAddress: props.publicAddress,
        owner: {
          connect: { id: parseInt(props.userID) },
        },
      },
    });
  }
}
