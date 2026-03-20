import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(
    () => (localStorage.getItem('ht-theme') as 'light' | 'dark') ?? 'light'
  )

  useEffect(() => {
    const root = document.documentElement
    theme === 'dark' ? root.setAttribute('data-theme', 'dark') : root.removeAttribute('data-theme')
    localStorage.setItem('ht-theme', theme)
  }, [theme])

  return (
    <button
      onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}
      className="p-2 rounded-md transition-colors"
      style={{ color: 'var(--text-muted)' }}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  )
}
