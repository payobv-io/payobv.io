import { SkeletonStatCard } from "../skeleton";

export const CardWrapperSkeleton = () => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
    </div>
  );
}