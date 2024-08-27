import { getPaidBountyDetails, totalRepositories } from "@/lib/data"
import { BookIcon, CheckCircleIcon, DollarSignIcon, UsersIcon } from "lucide-react"
import StatCard from "./stat-card"

type CardWrapperProps = {
  userId: number
}

export default async function CardWrapper({
  userId
}: CardWrapperProps) {
  const paidBountyDetails = await getPaidBountyDetails(userId)
  const totalRepostories = await totalRepositories(userId)

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <StatCard 
        index={1}
        title="Total Bounty Paid"
        value={`${paidBountyDetails.totalAmount} SOL`}
        icon={<DollarSignIcon className="h-6 w-6 text-gray-400" />}
      />
      <div className="grid gap-6 md:grid-cols-3 col-span-2">
        <StatCard 
          index={2}
          title="Total Issues Solved"
          value={paidBountyDetails.totalBounties.toString()}
          icon={<CheckCircleIcon className="h-6 w-6 text-gray-400" />}
        />
        <StatCard 
          index={3}
          title="Total Repositories"
          value={totalRepostories.toString()}
          icon={<BookIcon className="h-6 w-6 text-gray-400" />}
        />
        <StatCard 
          index={3}
          title="Total Contributors"
          value={paidBountyDetails.totalBounties.toString()}
          icon={<UsersIcon className="h-6 w-6 text-gray-400" />}
        />
      </div>
    </div>
  )
}