import { PageShellProps } from '@/interface'
import { Layers } from 'lucide-react'

const PageShell = ({ title, description }: PageShellProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-3 p-8">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
        <Layers className="h-6 w-6 text-muted-foreground" />
      </div>

      <h1 className="text-2xl font-bold">{title}</h1>

      {description && <p className="text-muted-foreground text-sm max-w-sm">{description}</p>}

      <span className="mt-2 text-xs border rounded-full px-3 py-1 text-muted-foreground">
        Page coming soon
      </span>
    </div>
  )
}

export default PageShell
