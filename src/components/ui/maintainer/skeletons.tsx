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

export const WalletCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center gap-x-4">
          <Skeleton className="h-6 w-6 rounded-full" />
          <div className="flex gap-x-2 items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}