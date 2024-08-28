import { BadgeProps } from "@/components/ui/badge";
import { BountyStatus } from "@prisma/client";

export const bountyStatusDetails: {
  [key in BountyStatus]: {
    variant: BadgeProps["variant"]
    label: string
  }
} = {
  "OPEN" : {
    variant: "outline",
    label: "OPEN"
  },
  "PENDING_ESCROW" : {
    variant: "secondary",
    label: "PENDING ESCROW"
  },
  "RELEASING_ESCROW" : {
    variant: "primary",
    label: "PROCESSING"
  },
  "COMPLETED" : {
    variant: "success",
    label: "PAID"
  },
  "CANCELLED" : {
    variant: "alert",
    label: "REJECTED"
  },
}