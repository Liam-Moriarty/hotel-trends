import { insights } from '@/mocks'
import { ctaClasses, ctaStyles, dotColors } from '@/utils/insightColors'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles } from 'lucide-react'

export default function InsightsPanel() {
  return (
    <Card className="flex-[2]">
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" style={{ color: 'var(--accent-violet)' }} />
            <CardTitle className="text-sm">AI Insights Panel</CardTitle>
          </div>
          <Badge variant="ai" className="rounded-full text-[11px] gap-1">
            <Sparkles className="h-3 w-3" />
            GPT-4o
          </Badge>
        </div>
        <CardDescription>4 automated recommendations • Updated 2 min ago</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="grid grid-cols-2 gap-3">
          {insights.map(i => (
            <div key={i.title} className="ai-card rounded-md p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`w-2 h-2 rounded-full ${dotColors[i.variant]}`} />
                <Badge
                  variant={i.variant}
                  className="text-[10px] tracking-widest uppercase rounded"
                >
                  {i.badge}
                </Badge>
              </div>
              <p className="text-sm font-semibold mb-1.5">{i.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">{i.body}</p>
              <Button
                variant="outline"
                size="sm"
                className={`text-xs bg-transparent ${ctaClasses[i.variant]}`}
                style={ctaStyles[i.variant]}
              >
                {i.cta}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
