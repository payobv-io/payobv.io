import { z } from "zod";

export const bountyCreateSchema = z.object({
  bounty: z.number(),
  issueNumber: z.number(),
  authorId: z.number(),
  repositoryId: z.number(),
})

export const installationCreateSchema = z.object({
  userId: z.number(),
  installationId: z.number(),
  repositories: z.array(z.object({
    id: z.number(),
    name: z.string(),
    isPrivate: z.boolean(),
  }))
});