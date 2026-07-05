import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Settings } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { name: theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-dark-900 shadow-sm border-b border-dark-100 dark:border-dark-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">📅</span>
          </div>
          <h1 className="text-xl font-bold text-dark-900 dark:text-white hidden sm:block">
            Daily Countdown
          </h1>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          <Link
            to="/settings"
            className="p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
          >
            <Settings size={20} className="text-dark-600 dark:text-dark-300" />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="sm:hidden border-t border-dark-100 dark:border-dark-800 bg-white dark:bg-dark-800 p-4 space-y-2">
          <Link to="/" className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
            Home
          </Link>
          <Link to="/countdowns" className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
            Countdowns
          </Link>
          <Link to="/statistics" className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
            Statistics
          </Link>
          <Link to="/calendar" className="block px-4 py-2 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-700">
            Calendar
          </Link>
        </nav>
      )}
    </header>
  )
}

export default Header
