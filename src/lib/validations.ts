import { z } from "zod";

export const bountyCreateSchema = z.object({
  bounty: z.number(),
  issueNumber: z.number(),
  authorId: z.number(),
  repositoryId: z.number(),
})