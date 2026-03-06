import { FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center gap-4 p-8">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <FileQuestion className="h-10 w-10 text-muted-foreground" />
      </div>

      <h1 className="text-4xl font-bold tracking-tight">404</h1>
      <h2 className="text-2xl font-semibold text-muted-foreground">Page Not Found</h2>

      <p className="text-muted-foreground max-w-sm mt-2 mb-6">
        Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't
        exist.
      </p>

      <Link
        to="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Return to Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage
