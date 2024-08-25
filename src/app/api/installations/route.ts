import { db } from "@/db/db";
import { installationCreateSchema, installationDeleteSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

/**
 * 1. Delete Repository Users
 * 2. Delete Repositories
 */
async function deleteRepositories(data: z.infer<typeof installationDeleteSchema>): Promise<number> {
  const { userId, repositories } = data

  return db.$transaction(async (transaction) => {
    // First, delete the RepositoryUser entries
    await transaction.repositoryUser.deleteMany({
      where: {
        userId: userId,
        repositoryId: { in: repositories }
      }
    })

    // Then, delete the Repository entries
    const deleteResult = await transaction.repository.deleteMany({
      where: {
        id: { in: repositories }
      }
    })

    return deleteResult.count
  })
}

/**
 * 1. Create Repositories
 * 2. Create Repository Users
 */
async function createRepositories(data: z.infer<typeof installationCreateSchema>): Promise<number> {
  const { userId, installationId, repositories } = data

  return db.$transaction(async (transaction) => {
    // create the Repository entries
    const newRepositories = await transaction.repository.createManyAndReturn({
      data: repositories.map((repo) => ({
        id: repo.id,
        name: repo.name,
        installationId: installationId,
        isPrivate: repo.isPrivate
      })),
      skipDuplicates: true
    })

    // create the RepositoryUser entries
    await transaction.repositoryUser.createMany({
      data: newRepositories.map((repo) => ({
        repositoryId: repo.id,
        userId: userId,
      })),
      skipDuplicates: true
    })

    return newRepositories.length
  })
}

export async function POST(req: NextRequest) {
  const response = installationCreateSchema.safeParse(req.body);

  if(!response.success){
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  const data = response.data;

  /**
   * 1. Create Repositories
   * 2. Create Repository Users
   */
  try {
    const repositoryUsers = await createRepositories(data);

    return NextResponse.json(
      { message: `${repositoryUsers} repositories Details Added to the Database. ` }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create installation" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const response = installationDeleteSchema.safeParse(req.body);

  if(!response.success){
    return NextResponse.json(
      { message: "Invalid data" }, 
      { status: 400 }
    );
  }

  const data = response.data;

  try {
    const deletedCount = await deleteRepositories(data);

    return NextResponse.json(
      { message: `${deletedCount} repositories removed from database` }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete installation" }, 
      { status: 500 }
    );
  }
}