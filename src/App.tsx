import { Routes, Route, Navigate } from 'react-router-dom'
import GameView from './views/GameView'
import MenuView from './views/MenuView'
import { useState, useEffect } from 'react'

function App() {
  // Theme
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <Routes>
      <Route path="/" element={<MenuView isDark={isDark} setIsDark={setIsDark} />} />
      <Route path="/play" element={<GameView isDark={isDark} setIsDark={setIsDark} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App