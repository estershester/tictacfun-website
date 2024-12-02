import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Board from '../components/Board'
import GameStatus from '../components/GameStatus'
import ThemeToggle from '../components/ThemeToggle'
import Footer from '../components/Footer'
import { RefreshCw, Home } from 'lucide-react'
import { getBestMove } from '../utils/AIPlayer'

interface GameViewProps {
  isDark: boolean
  setIsDark: (value: boolean) => void
}

function GameView({ isDark, setIsDark }: GameViewProps) {
  const navigate = useNavigate()
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  
  // Load game settings from localStorage
  const [gameSettings] = useState(() => {
    const saved = localStorage.getItem('gameSettings')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      isAIMode: true,
      playerMarker: 'X',
      aiDifficulty: 'medium'
    }
  })

  const { isAIMode, playerMarker, aiDifficulty } = gameSettings
  
  const winner = calculateWinner(board)
  const isDraw = !winner && board.every(cell => cell !== null)

  useEffect(() => {
    if (isAIMode && !xIsNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(board, aiDifficulty)
        if (aiMove !== -1) {
          const newBoard = board.slice()
          newBoard[aiMove] = playerMarker === 'X' ? 'O' : 'X'
          setBoard(newBoard)
          setXIsNext(true)
        }
      }, 800)

      return () => clearTimeout(timer)
    }
  }, [board, xIsNext, isAIMode, winner, isDraw, playerMarker, aiDifficulty])

  const handleClick = (index: number) => {
    if (board[index] || winner || (!xIsNext && isAIMode)) return

    const newBoard = board.slice()
    newBoard[index] = xIsNext ? playerMarker : (playerMarker === 'X' ? 'O' : 'X')
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  const returnToMenu = () => {
    navigate('/')
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
      
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-lg mx-auto">
        <header className="text-center mb-8">
          <h1 className="game-title text-4xl md:text-5xl text-slate-800 dark:text-white">
            TIC TAC FUN!
          </h1>
        </header>
        
        <div className="flex flex-col items-center gap-6 w-full">
          <GameStatus 
            winner={winner} 
            isDraw={isDraw} 
            xIsNext={xIsNext}
            isAIMode={isAIMode}
            playerMarker={playerMarker}
          />
          
          <Board board={board} onCellClick={handleClick} winner={winner} />
          
          <div className="flex gap-4">
            <button 
              onClick={resetGame}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 
                hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 
                text-slate-700 dark:text-slate-200 font-bold transform hover:scale-105"
            >
              <RefreshCw size={20} />
              Reset
            </button>

            <button 
              onClick={returnToMenu}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 
                hover:bg-slate-300 dark:hover:bg-slate-600 transition-all duration-300 
                text-slate-700 dark:text-slate-200 font-bold transform hover:scale-105"
            >
              <Home size={20} />
              Menu
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

function calculateWinner(squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

export default GameView