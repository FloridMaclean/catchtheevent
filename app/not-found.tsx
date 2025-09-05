import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-primary-500 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Page Not Found</h2>
          <p className="text-slate-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="btn-primary w-full block"
          >
            Go back home
          </Link>
          
          <Link
            href="/contact"
            className="btn-secondary w-full block"
          >
            Contact Support
          </Link>
        </div>
        
        <div className="mt-8 text-sm text-slate-500">
          <p>Navigate to Catch The Event homepage</p>
          <Link 
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
} 