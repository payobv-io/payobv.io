import { options } from "@/app/api/auth/[...nextauth]/options";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CardWrapper from "@/components/ui/dashboard/card-wrapper";
import BountyTable from "@/components/ui/dashboard/table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSignIcon, UsersIcon, CheckCircleIcon, GithubIcon, LayoutDashboardIcon, InboxIcon, MenuIcon, TrendingUpIcon, PlusCircleIcon, BookIcon } from "lucide-react"
import { getServerSession } from "next-auth";

export default async function Page() {

  const session = await getServerSession(options);
  const userId = parseInt((session as any)?.token?.sub);

  if (!session || !userId) {
    return null;
  }

  const stats = [
    {
      title: "Total Bounty Paid",
      value: "$15,234",
      change: "+12.5%",
      changeType: "positive",
      icon: DollarSignIcon,
      description: "From last month",
    },
    {
      title: "Issues Resolved",
      value: "1,234",
      change: "-2.3%",
      changeType: "negative",
      icon: CheckCircleIcon,
      description: "Compared to last week",
    },
    {
      title: "Total Repositories",
      value: "89",
      change: "+5",
      changeType: "positive",
      icon: BookIcon,
      description: "Added this month",
    },
    {
      title: "Active Contributors",
      value: "324",
      change: "+18",
      changeType: "positive",
      icon: UsersIcon,
      description: "New this week",
    },
  ]

  const bounties = [
    {
      issue: "Implement dark mode",
      contributor: "Alice Johnson",
      bounty: "$500",
      repo: "acme/ui-library",
    },
    {
      issue: "Fix memory leak in worker",
      contributor: "Bob Smith",
      bounty: "$750",
      repo: "acme/backend-service",
    },
    {
      issue: "Add multi-language support",
      contributor: "Charlie Brown",
      bounty: "$1000",
      repo: "acme/frontend-app",
    },
    {
      issue: "Optimize database queries",
      contributor: "Diana Prince",
      bounty: "$600",
      repo: "acme/data-layer",
    },
    {
      issue: "Implement OAuth2 authentication",
      contributor: "Ethan Hunt",
      bounty: "$800",
      repo: "acme/auth-service",
    },
  ]

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <Button className="flex items-center space-x-2">
            <PlusCircleIcon className="h-5 w-5" />
            <span>Add Repositories</span>
          </Button>
        </div>
        
        <CardWrapper userId={userId} />
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Bounties</h2>
        <Card>
          <BountyTable userId={userId} />
        </Card>
      </div>
    </main>
  )
}