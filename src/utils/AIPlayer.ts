type Board = Array<string | null>
type Difficulty = 'easy' | 'medium' | 'hard'

export function getBestMove(board: Board, difficulty: Difficulty = 'medium'): number {
  // For easy mode, sometimes make random moves
  if (difficulty === 'easy' && Math.random() < 0.4) {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter((index): index is number => index !== null)
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  // For medium mode, sometimes make sub-optimal moves
  if (difficulty === 'medium' && Math.random() < 0.3) {
    const availableMoves = board
      .map((cell, index) => cell === null ? index : null)
      .filter((index): index is number => index !== null)
    
    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  let bestScore = -Infinity
  let bestMove = -1

  // Get all empty cells
  const availableMoves = board
    .map((cell, index) => cell === null ? index : null)
    .filter((index): index is number => index !== null)

  // Try each available move
  for (const move of availableMoves) {
    const newBoard = [...board]
    newBoard[move] = 'O'
    
    const score = minimax(newBoard, 0, false)
    
    if (score > bestScore) {
      bestScore = score
      bestMove = move
    }
  }

  return bestMove
}

function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const winner = calculateWinner(board)
  
  // Terminal states
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (board.every(cell => cell !== null)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'
        bestScore = Math.max(bestScore, minimax(board, depth + 1, false))
        board[i] = null
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X'
        bestScore = Math.min(bestScore, minimax(board, depth + 1, true))
        board[i] = null
      }
    }
    return bestScore
  }
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