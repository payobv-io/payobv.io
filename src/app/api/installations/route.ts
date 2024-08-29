import { db } from '@/db/db';
import {
  installationCreateSchema,
  installationDeleteSchema,
} from '@/lib/validations';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * 1. Delete Repository Users
 * 2. Delete Repositories
 */
async function deleteRepositories(
  data: z.infer<typeof installationDeleteSchema>
): Promise<number> {
  const { userId, repositories } = data;

  return db.$transaction(
    async (transaction) => {
      // First, delete the RepositoryUser entries
      await transaction.repositoryUser.deleteMany({
        where: {
          userId: userId,
          repositoryId: { in: repositories },
        },
      });

      // Then, delete the Repository entries
      const deleteResult = await transaction.repository.deleteMany({
        where: {
          id: { in: repositories },
        },
      });

      return deleteResult.count;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );
}

/**
 * 1. Create Repositories
 * 2. Create Repository Users
 */
async function createRepositories(
  data: z.infer<typeof installationCreateSchema>
): Promise<number> {
  const { userId, installationId, repositories } = data;

  return db.$transaction(
    async (transaction) => {
      // create the Repository entries
      const newRepositories = await transaction.repository.createMany({
        data: repositories.map((repo) => ({
          id: repo.id,
          name: repo.name,
          installationId: installationId,
          isPrivate: repo.isPrivate,
        })),
        skipDuplicates: true,
      });

      // create the RepositoryUser entries
      await transaction.repositoryUser.createMany({
        data: repositories.map((repo) => ({
          repositoryId: repo.id,
          userId: userId,
        })),
        skipDuplicates: true,
      });

      return newRepositories.count;
    },
    {
      maxWait: 5000,
      timeout: 10000,
    }
  );
}

export async function POST(req: NextRequest) {
  const responseData = await req.json();
  const parsedResponse = installationCreateSchema.safeParse(responseData);

  if (!parsedResponse.success) {
    console.error(parsedResponse.error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const data = parsedResponse.data;

  /**
   * 1. Create Repositories
   * 2. Create Repository Users
   */
  try {
    const addedCount = await createRepositories(data);

    return NextResponse.json({ count: addedCount }, { status: 200 });
  } catch (error) {
    console.error(`Error adding repositories: ${error}`);
    return NextResponse.json(
      { message: 'Failed to create installation' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const responseData = await req.json();
  const parsedResponse = installationDeleteSchema.safeParse(responseData);

  if (!parsedResponse.success) {
    console.error(parsedResponse.error);
    return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
  }

  const data = parsedResponse.data;

  try {
    const deletedCount = await deleteRepositories(data);

    return NextResponse.json({ count: deletedCount }, { status: 200 });
  } catch (error) {
    console.error(`Error deleting repositories: ${error}`);
    return NextResponse.json(
      { message: 'Failed to delete installation' },
      { status: 500 }
    );
  }
}
