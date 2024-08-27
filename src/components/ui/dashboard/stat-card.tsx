import { Card, CardContent } from "../card";

type StatCardProps = {
  index: number
  title: string
  icon: React.ReactNode
  value: string
}

export default function StatCard({
  index,
  title,
  icon,
  value
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
      </CardContent>
    </Card>
  )
}