import Cell from './Cell'

interface BoardProps {
  board: Array<string | null>
  onCellClick: (index: number) => void
  winner: string | null
}

function Board({ board, onCellClick, winner }: BoardProps) {
  const winningLine = calculateWinningLine(board)

  return (
    <div className="grid grid-cols-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl pixel-border p-3 transform hover:scale-[1.02] transition-all duration-300">
      {board.map((value, index) => (
        <Cell 
          key={index}
          value={value}
          onClick={() => onCellClick(index)}
          position={index}
          isWinningCell={winningLine?.includes(index)}
          winner={winner}
        />
      ))}
    </div>
  )
}

function calculateWinningLine(squares: Array<string | null>): number[] | null {
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
      return [a, b, c]
    }
  }

  return null
}

export default Board