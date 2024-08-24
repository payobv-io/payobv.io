import db from "@/db/db";
import { installationCreateSchema } from "@/lib/validations";
import { NextRequest, NextResponse } from "next/server";

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
    const newRepositories = await db.repository.createManyAndReturn({
      data: data.repositories.map((repo) => ({
        id: repo.id,
        name: repo.name,
        installationId: data.installationId,
        isPrivate: repo.isPrivate
      })),
      skipDuplicates: true
    })
  
    const repositoryUsers = await db.repositoryUser.createMany({
      data: newRepositories.map((repo) => ({
        repositoryId: repo.id,
        userId: data.userId,
      })),
      skipDuplicates: true
    });

    return NextResponse.json(
      { message: `Repositories Details Added to the Database. Count: ${repositoryUsers.count}` }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create installation" }, 
      { status: 500 }
    );
  }
}