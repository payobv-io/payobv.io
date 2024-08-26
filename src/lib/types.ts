import type { BountyStatus } from "@prisma/client"
import { LucideProps } from "lucide-react"

export type NavLink = {
  name: string
  href: string
  icon: React.ReactNode
}

export type EscrowRequestFromDb = {
  id: number
  title: string
  issueNumber: number
  repositoryId: number
  repository: {
    name: string
  }
  amount: number
  createdAt: Date
}

export type PaidBountyDetails = {
  totalAmount: number
  totalBounties: number
}