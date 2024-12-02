interface GameStatusProps {
  winner: string | null
  isDraw: boolean
  xIsNext: boolean
  isAIMode: boolean
  playerMarker: 'X' | 'O'
}

function GameStatus({ winner, isDraw, xIsNext, isAIMode, playerMarker }: GameStatusProps) {
  let status: string
  let emoji: string
  
  if (winner) {
    if (isAIMode) {
      if (winner === playerMarker) {
        status = 'YOU WIN!'
        emoji = '🎉'
      } else {
        status = 'AI WINS!'
        emoji = '🤖'
      }
    } else {
      status = `${winner} WINS!`
      emoji = '🏆'
    }
  } else if (isDraw) {
    status = "IT'S A DRAW!"
    emoji = '🤝'
  } else if (isAIMode) {
    if (xIsNext) {
      status = "Your turn"
      emoji = '👉'
    } else {
      status = "AI is thinking..."
      emoji = '🤔'
    }
  } else {
    status = `${xIsNext ? 'X' : 'O'}'s turn`
    emoji = '👉'
  }

  return (
    <div className={`
      text-xl md:text-2xl font-bold px-6 py-4 rounded-xl transition-all duration-300
      ${winner ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' : 
        isDraw ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : 
        'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'}
      ${(winner || isDraw) ? 'victory-bounce' : ''}
      transform hover:scale-105
    `}>
      {emoji} {status}
    </div>
  )
}

export default GameStatus