import { useNavigate } from 'react-router-dom'
import MainMenu from '../components/MainMenu'
import ThemeToggle from '../components/ThemeToggle'
import Footer from '../components/Footer'
import { useState } from 'react'

interface MenuViewProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

function MenuView({ isDark, setIsDark }: MenuViewProps) {
  const navigate = useNavigate()
  const [isAIMode, setIsAIMode] = useState(true)
  const [playerMarker, setPlayerMarker] = useState<'X' | 'O'>('X')
  const [aiDifficulty, setAiDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium')

  const startGame = () => {
    // Store game settings in localStorage
    localStorage.setItem('gameSettings', JSON.stringify({
      isAIMode,
      playerMarker,
      aiDifficulty
    }))
    navigate('/play')
  }

  const containerClasses = `
    min-h-screen
    flex
    flex-col
    items-center
    justify-center
    bg-gradient-to-b
    from-slate-50
    to-slate-100
    dark:from-slate-900
    dark:to-slate-800
    transition-colors
    duration-300
    p-4
    relative
  `

  return (
    <div className={containerClasses}>
      <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
      <MainMenu
        isAIMode={isAIMode}
        setIsAIMode={setIsAIMode}
        playerMarker={playerMarker}
        setPlayerMarker={setPlayerMarker}
        aiDifficulty={aiDifficulty}
        setAiDifficulty={setAiDifficulty}
        onStartGame={startGame}
      />
      <Footer />
    </div>
  )
}

export default MenuView