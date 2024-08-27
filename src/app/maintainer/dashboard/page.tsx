import { options } from "@/app/api/auth/[...nextauth]/options";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CardWrapper from "@/components/ui/dashboard/card-wrapper";
import BountyTable from "@/components/ui/dashboard/table";
import { PlusCircleIcon } from "lucide-react";
import { getServerSession } from "next-auth";

export default async function Page() {

  const session = await getServerSession(options);
  const userId = parseInt((session as any)?.token?.sub);

  if (!session || !userId) {
    return null;
  }

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 h-full">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <a 
            href="https://github.com/apps/payobvio-github-app/installations/new"
            target="_blank"
          >
            <Button className="flex items-center space-x-2">
              <PlusCircleIcon className="h-5 w-5" />
              <span>Add Repositories</span>
            </Button>
          </a>
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