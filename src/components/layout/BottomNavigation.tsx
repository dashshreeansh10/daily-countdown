import { Link, useLocation } from 'react-router-dom'
import { Home, ListTodo, BarChart3, Calendar, BookOpen } from 'lucide-react'

function BottomNavigation() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/')

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/countdowns', icon: ListTodo, label: 'Countdowns' },
    { path: '/statistics', icon: BarChart3, label: 'Stats' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/journal', icon: BookOpen, label: 'Journal' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-900 border-t border-dark-100 dark:border-dark-800 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
              isActive(path)
                ? 'text-primary-500 border-t-2 border-primary-500'
                : 'text-dark-600 dark:text-dark-400 hover:text-dark-900 dark:hover:text-white'
            }`}
            title={label}
          >
            <Icon size={24} />
            <span className="text-xs mt-1 hidden sm:block">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation
