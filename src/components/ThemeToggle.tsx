import { Moon, Sun } from 'lucide-react'

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
}

function ThemeToggle({ isDark, onToggle }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-all duration-200 text-slate-700 dark:text-slate-200 hover:scale-110"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  )
}

export default ThemeToggle