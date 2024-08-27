import { LockIcon } from "lucide-react";
import { Card, CardContent } from "./card";

type StatCardProps = {
  index: number
  title: string
  icon: React.ReactNode
  value: string
  subText?: string
  details?: {
    paid: number
    escrowed: number
  }
}

export default function StatCard({
  index,
  title,
  icon,
  value,
  subText,
  details
}: StatCardProps) {
  return (
    <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-500">{title}</span>
          {icon}
        </div>
        <div className="flex items-baseline">
          <span className="text-3xl font-semibold text-gray-900">{value}</span>
        </div>
        {
          details ? 
            <div className="flex flex-col gap-y-2">
              <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full" 
                  style={{width: `${(details.paid / (details.paid + details.escrowed)) * 100}%`}}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                  <span>Paid: ${details.paid.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <LockIcon className="w-3 h-3 text-gray-400 mr-1" />
                  <span>Escrowed: ${details.escrowed.toLocaleString()}</span>
                </div>
              </div>
            </div>
          : undefined
        }
        {
          subText ? 
            <p className="text-xs text-gray-500 mt-4">{subText}</p>
          : undefined
        }
      </CardContent>
    </Card>
  )
}