import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './store/themeStore'
import { initializeDatabase } from './services/database'
import BottomNavigation from './components/layout/BottomNavigation'
import Header from './components/layout/Header'
import Home from './pages/Home'
import CountdownList from './pages/CountdownList'
import CountdownDetail from './pages/CountdownDetail'
import CreateCountdown from './pages/CreateCountdown'
import Statistics from './pages/Statistics'
import Calendar from './pages/Calendar'
import Journal from './pages/Journal'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const { name: theme } = useThemeStore()
  const [isLoading, setIsLoading] = useState(true)
  const [dbReady, setDbReady] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      try {
        // Initialize database
        await initializeDatabase()
        setDbReady(true)

        // Load theme
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission()
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Failed to initialize app:', error)
        toast.error('Failed to initialize app')
        setIsLoading(false)
      }
    }

    initApp()
  }, [theme])

  if (isLoading || !dbReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-dark-900">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-dark-200 dark:border-dark-700 border-t-primary-500 animate-spin mx-auto mb-4"></div>
          <p className="text-dark-600 dark:text-dark-300">Loading Daily Countdown...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-dark-900 text-dark-900 dark:text-white transition-colors duration-300 pb-20">
        <Header />
        <main className="container mx-auto px-4 py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countdowns" element={<CountdownList />} />
            <Route path="/countdown/:id" element={<CountdownDetail />} />
            <Route path="/countdown/new" element={<CreateCountdown />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <BottomNavigation />
      </div>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
