import { Card, CardContent } from "../card";
import { Skeleton, SkeletonStatCard } from "../skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

export const CardWrapperSkeleton = () => {
  return (
    <div className="grid gap-6 mb-8 md:grid-cols-3">
      <SkeletonStatCard />
      <div className="grid gap-6 md:grid-cols-3 col-span-2">
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>
    </div>
  );
}