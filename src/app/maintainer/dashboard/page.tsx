import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSignIcon, UsersIcon, CheckCircleIcon, GithubIcon, LayoutDashboardIcon, InboxIcon, MenuIcon, TrendingUpIcon, PlusCircleIcon } from "lucide-react"

export default function Page() {

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
      title: "Active Contributors",
      value: "324",
      change: "+18",
      changeType: "positive",
      icon: UsersIcon,
      description: "New this week",
    },
    {
      title: "Issues Resolved",
      value: "1,234",
      change: "-2.3%",
      changeType: "negative",
      icon: CheckCircleIcon,
      description: "Compared to last week",
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
        
        <div className="grid gap-6 mb-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-500">{stat.title}</span>
                  <stat.icon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="flex items-baseline">
                  <span className="text-3xl font-semibold text-gray-900">{stat.value}</span>
                  <span className={`ml-2 text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <TrendingUpIcon className={`h-4 w-4 ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`} />
                  <span className="text-xs text-gray-500 ml-1">{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Bounties</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Issue</TableHead>
                <TableHead>Contributor</TableHead>
                <TableHead>Bounty</TableHead>
                <TableHead>Repo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bounties.map((bounty, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {bounty.issue}
                  </TableCell>
                  <TableCell>{bounty.contributor}</TableCell>
                  <TableCell>{bounty.bounty}</TableCell>
                  <TableCell>{bounty.repo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </main>
  )
}