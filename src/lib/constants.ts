import { BadgeProps } from "@/components/ui/badge";
import { BountyStatus } from "@prisma/client";

export const bountyVariants: {
  [key in BountyStatus]: BadgeProps["variant"]
} = {
  "OPEN" : "default",
  "PENDING_ESCROW" : "secondary",
  "COMPLETED" : "success",
  "CANCELLED" : "alert",
}