import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { CheckSquare, Clock, Zap, Wrench } from 'lucide-react'

export function OperationsKpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Rooms Ready</p>
            <CheckSquare className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">184/220</p>
          <Progress value={(184 / 220) * 100} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Staff On Shift</p>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">43/47</p>
          <Progress value={(43 / 47) * 100} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Energy vs Budget</p>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">+8%</p>
          <Progress value={58} className="mt-3 h-1.5" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <p className="text-sm text-muted-foreground">Maintenance Open</p>
            <Wrench className="w-4 h-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold mt-2">4 Tasks</p>
          <Progress value={40} className="mt-3 h-1.5 [&>div]:bg-red-500" />
        </CardContent>
      </Card>
    </div>
  )
}
