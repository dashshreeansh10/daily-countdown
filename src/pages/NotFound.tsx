import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 text-center">
      <div className="text-6xl mb-4">404</div>
      <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Page Not Found</h1>
      <p className="text-dark-600 dark:text-dark-400 mb-6">Sorry, the page you're looking for doesn't exist</p>
      <Link to="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
