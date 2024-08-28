import { BountyStatus, db } from '@/db/db';
import {
  ContributedBountyDetail,
  ContributionDetails,
  EscrowRequestFromDb,
  PaidBountyDetails,
} from './types';

/**
 * Fetches all the escrow requests for the maintainer
 *
 * @param userId
 * @returns Array of escrow requests for the maintainer
 * @example of the return value:
 * [
 *  {
 *   id: 1,
 *   issueNumber: 1,
 *   repositoryId: 1,
 *   amount: 500,
 *   status: 'PENDING_ESCROW',
 *   createdAt: 2023-06-20T00:00:00.000Z,
 *   repository: { name: 'acme/ui-library' }
 *  },
 * ...
 * ]
 *
 *
 */
export const getEscrowRequests = async (
  userId: number
): Promise<EscrowRequestFromDb[] | []> => {
  try {
    const requests: EscrowRequestFromDb[] = await db.bounty.findMany({
      where: {
        authorId: userId,
        status: BountyStatus.PENDING_ESCROW,
      },
      select: {
        id: true,
        title: true,
        issueNumber: true,
        repositoryId: true,
        amount: true,
        createdAt: true,
        repository: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return requests;
  } catch (error) {
    console.error('Error fetching escrow requests:', error);
    return [];
  }
};

/**
 * Fetches the recent bounties for the maintainer (not the PENDING_ESCROW bounties)
 * where bounty status is anything in the list:
 * 1. "OPEN"
 * 2. "COMPLETED"
 * 3. "CANCELLED"
 *
 * @param userId
 * @returns Array of recent bounties for the maintainer
 * @example of the return value:
 * [
 *  {
 *   id: 1,
 *   issueNumber: 1,
 *   repositoryId: 1,
 *   amount: 500,
 *   status: 'PENDING_ESCROW',
 *   createdAt: 2023-06-20T00:00:00.000Z,
 *   repository: { name: 'acme/ui-library' }
 *  },
 * ...
 * ]
 *
 *
 */
export const getRecentBounties = async (userId: number) => {
  try {
    const bounties = await db.bounty.findMany({
      where: {
        authorId: userId,
        status: {
          not: BountyStatus.PENDING_ESCROW,
        },
      },
      select: {
        id: true,
        title: true,
        issueNumber: true,
        repositoryId: true,
        amount: true,
        status: true,
        createdAt: true,
        receiverId: true,
        receiver: {
          select: {
            githubId: true,
          },
        },
        repository: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return bounties;
  } catch (error) {
    console.error('Error fetching recent bounties:', error);
    return [];
  }
};

/**
 * Fetches the total paid bounty amount for the maintainer
 *
 * @param userId
 * @returns Total paid bounty amount for the maintainer
 *
 */
export const getPaidBountyDetails = async (
  userId: number
): Promise<PaidBountyDetails> => {
  try {
    // Fetch the total paid bounty amount and the total number of bounties
    const detail = await db.bounty.aggregate({
      _sum: {
        amount: true,
      },
      _count: true,
      where: {
        authorId: userId,
        status: BountyStatus.COMPLETED,
      },
    });

    return {
      totalAmount: detail._sum.amount || 0,
      totalBounties: detail._count,
    };
  } catch (error) {
    console.error('Error fetching total paid bounty details:', error);
    return {
      totalAmount: 0,
      totalBounties: 0,
    };
  }
};

/**
 * Fetches the total number of repositories for the maintainer
 *
 * @param userId
 * @returns Total number of repositories for the maintainer
 *
 */
export const totalRepositories = async (userId: number): Promise<number> => {
  try {
    const total = await db.repositoryUser.count({
      where: {
        userId,
      },
    });

    return total;
  } catch (error) {
    console.error('Error fetching total repositories:', error);
    return 0;
  }
};

/**
 * Fetches the total money spent by the maintainer
 *
 * @param userId
 * @returns Total money spent by the maintainer (Paid and Escrowed)
 *
 */
export const getTotalMoneySpent = async (userId: number): Promise<number> => {
  try {
    const total = await db.bounty.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        authorId: userId,
        status: {
          in: [BountyStatus.COMPLETED, BountyStatus.OPEN],
        },
      },
    });

    return total._sum.amount || 0;
  } catch (error) {
    console.error('Error fetching total money spent:', error);
    return 0;
  }
};

/**
 * Fetches the total earning details for the maintainer
 *
 * @param userId
 * @returns Total earning details for the maintainer
 * @example of the return value:
 * {
 *  totalAmount: 500,
 *  totalBounties: 5,
 *  repositoryCount: 3
 * }
 *
 */
export const getContributionDetails = async (
  userId: number
): Promise<ContributionDetails> => {
  try {
    const bountyDetails = await db.bounty.aggregate({
      _sum: {
        amount: true,
      },
      _count: true,
      where: {
        receiverId: userId,
        status: BountyStatus.COMPLETED,
      },
    });

    const repositories = await db.bounty.groupBy({
      by: ['repositoryId'],
      where: {
        receiverId: userId,
        status: BountyStatus.COMPLETED,
      },
    });

    return {
      totalAmount: bountyDetails._sum.amount || 0,
      totalBounties: bountyDetails._count,
      repositoryCount: repositories.length,
    };
  } catch (error) {
    console.error('Error fetching total earning details: ', error);
    return {
      totalAmount: 0,
      totalBounties: 0,
      repositoryCount: 0,
    };
  }
};

export const getContributedBountyDetails = async (
  userId: number
): Promise<ContributedBountyDetail[] | []> => {
  try {
    const bountyDetails = await db.bounty.findMany({
      where: {
        receiverId: userId,
        status: {
          in: [BountyStatus.COMPLETED, BountyStatus.RELEASING_ESCROW],
        },
      },
      select: {
        id: true,
        issueNumber: true,
        title: true,
        amount: true,
        signature: true,
        status: true,
        repository: {
          select: {
            name: true,
          },
        },
      },
    });

    return bountyDetails as ContributedBountyDetail[];
  } catch (error) {
    console.error('Error fetching contributed bounty details:', error);
    return [];
  }
};
