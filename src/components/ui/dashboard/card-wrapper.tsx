import { getPaidBountyDetails, getTotalMoneySpent, totalRepositories } from "@/lib/data"
import { BookIcon, CheckCircleIcon, DollarSignIcon, UsersIcon } from "lucide-react"
import StatCard from "./stat-card"

type CardWrapperProps = {
  userId: number
}

export default async function CardWrapper({
  userId
}: CardWrapperProps) {
  const paidBountyDetails = await getPaidBountyDetails(userId)
  const totalMoneySpent = await getTotalMoneySpent(userId)
  const totalRepostories = await totalRepositories(userId)

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <StatCard 
        index={1}
        title="Bounty"
        value={`${totalMoneySpent} SOL`}
        details={{
          paid: paidBountyDetails.totalAmount,
          escrowed: totalMoneySpent - paidBountyDetails.totalAmount
        }}
        icon={<DollarSignIcon className="h-6 w-6 text-gray-400" />}
      />
      <div className="grid gap-6 md:grid-cols-3 col-span-2">
        <StatCard 
          index={2}
          title="Issues"
          value={paidBountyDetails.totalBounties.toString()}
          icon={<CheckCircleIcon className="h-6 w-6 text-gray-400" />}
          subText="Issues resolved"
        />
        <StatCard 
          index={3}
          title="Repositories"
          value={totalRepostories.toString()}
          icon={<BookIcon className="h-6 w-6 text-gray-400" />}
          subText="Repositories managed by you"
        />
        <StatCard 
          index={3}
          title="Contributors"
          value={paidBountyDetails.totalBounties.toString()}
          icon={<UsersIcon className="h-6 w-6 text-gray-400" />}
          subText="Received bounties"
        />
      </div>
    </div>
  )
}