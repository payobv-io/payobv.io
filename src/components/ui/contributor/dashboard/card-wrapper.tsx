import { getContributionDetails } from '@/lib/data';
import { BookIcon, CheckCircleIcon, DollarSignIcon } from 'lucide-react';
import StatCard from '../../stat-card';

type CardWrapperProps = {
  userId: number;
};

export default async function CardWrapper({ userId }: CardWrapperProps) {
  const { totalAmount, totalBounties, repositoryCount } =
    await getContributionDetails(userId);

  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <StatCard
        index={1}
        title="Earnings"
        value={`${totalAmount} SOL`}
        icon={<DollarSignIcon className="h-6 w-6 text-gray-400" />}
        subText="Bounty earnings"
      />
      <StatCard
        index={2}
        title="Issues"
        value={totalBounties.toString()}
        icon={<CheckCircleIcon className="h-6 w-6 text-gray-400" />}
        subText="Issues resolved"
      />
      <StatCard
        index={3}
        title="Repositories"
        value={repositoryCount.toString()}
        icon={<BookIcon className="h-6 w-6 text-gray-400" />}
        subText="Repositories contributed to"
      />
    </div>
  );
}
