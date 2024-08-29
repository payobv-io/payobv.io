import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

const SkeletonStatCard = () => {
  return (
    <Card className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-6" />
        </div>
        <div className="flex items-baseline">
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="flex flex-col gap-y-2 mt-4">
          <Skeleton className="h-2 w-full rounded-full" />
          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <Skeleton className="h-2 w-1/4 rounded-full" />
            </div>
            <div className="flex items-center">
              <Skeleton className="h-2 w-1/4 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-4 w-[100px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px]" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 w-[100px]" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
          <TableCell className="text-right">
            <Skeleton className="h-4 w-[100px]" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}


const WalletCardSkeleton = () => {
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


export { Skeleton, SkeletonStatCard, TableSkeleton, WalletCardSkeleton }
