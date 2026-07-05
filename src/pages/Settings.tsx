import { useThemeStore } from '../store/themeStore'
import { Theme, ColorTheme } from '../types/theme'

function Settings() {
  const { name: theme, setTheme, colorTheme, setColorTheme, fontScale, setFontScale, reducedMotion, setReducedMotion } = useThemeStore()

  const themes: Theme[] = ['light', 'dark', 'auto']
  const colors: ColorTheme[] = ['blue', 'purple', 'green', 'red', 'orange']

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-dark-900 dark:text-white mb-2">Settings</h1>
        <p className="text-dark-600 dark:text-dark-400">Customize your app experience</p>
      </div>

      {/* Theme Settings */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">Theme</h3>
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Appearance
          </label>
          <div className="flex gap-2 flex-wrap">
            {themes.map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  theme === t
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-200 dark:bg-dark-700 text-dark-900 dark:text-white hover:bg-dark-300 dark:hover:bg-dark-600'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Color Theme */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">Color Theme</h3>
        <div>
          <label className="block text-sm font-medium text-dark-900 dark:text-white mb-2">
            Primary Color
          </label>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => {
              const colorMap: Record<ColorTheme, string> = {
                blue: 'bg-blue-500',
                purple: 'bg-purple-500',
                green: 'bg-green-500',
                red: 'bg-red-500',
                orange: 'bg-orange-500',
                black: 'bg-black',
                white: 'bg-white border-2 border-dark-300',
                custom: 'bg-gradient-to-r from-primary-500 to-primary-700',
              }
              return (
                <button
                  key={color}
                  onClick={() => setColorTheme(color)}
                  className={`w-10 h-10 rounded-full transition-transform ${
                    colorMap[color]
                  } ${colorTheme === color ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-dark-900 scale-110' : ''}`}
                  title={color}
                />
              )
            })}
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">Accessibility</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-dark-900 dark:text-white">
              Font Scale
            </label>
            <select
              value={fontScale}
              onChange={(e) => setFontScale(parseFloat(e.target.value))}
              className="input-field w-auto"
            >
              <option value={0.8}>Small (80%)</option>
              <option value={1}>Normal (100%)</option>
              <option value={1.2}>Large (120%)</option>
              <option value={1.5}>Extra Large (150%)</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-dark-900 dark:text-white">
              Reduce Motion
            </label>
            <button
              onClick={() => setReducedMotion(!reducedMotion)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                reducedMotion
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-200 dark:bg-dark-700 text-dark-900 dark:text-white'
              }`}
            >
              {reducedMotion ? 'On' : 'Off'}
            </button>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="glass-card p-6 space-y-4">
        <h3 className="text-lg font-semibold text-dark-900 dark:text-white">About</h3>
        <div className="text-sm text-dark-600 dark:text-dark-400 space-y-2">
          <p><strong>Daily Countdown</strong> v1.0.0</p>
          <p>One day closer to your dream.</p>
          <p>A production-ready Progressive Web App for tracking countdowns with daily motivation and notifications.</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
