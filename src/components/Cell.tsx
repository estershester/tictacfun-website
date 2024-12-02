interface CellProps {
  value: string | null
  onClick: () => void
  position: number
  isWinningCell?: boolean
  winner: string | null
}

function Cell({ value, onClick, position, isWinningCell, winner }: CellProps) {
  // Calculate border classes based on position
  const borderClasses = [
    // Top row
    "border-r-4 border-b-4",  // 0
    "border-r-4 border-l-4 border-b-4", // 1
    "border-l-4 border-b-4", // 2
    // Middle row
    "border-r-4 border-t-4 border-b-4", // 3
    "border-4", // 4
    "border-l-4 border-t-4 border-b-4", // 5
    // Bottom row
    "border-r-4 border-t-4", // 6
    "border-r-4 border-l-4 border-t-4", // 7
    "border-l-4 border-t-4", // 8
  ][position]

  return (
    <button
      className={`
        w-24 h-24 md:w-28 md:h-28 flex items-center justify-center
        text-5xl md:text-6xl font-bold
        ${borderClasses}
        border-slate-200 dark:border-slate-600
        ${value ? 'bg-slate-50 dark:bg-slate-700' : 'hover:bg-slate-100 dark:hover:bg-slate-700'}
        ${value === 'X' ? 'text-blue-500 dark:text-blue-400' : 'text-rose-500 dark:text-rose-400'}
        transition-colors duration-200
        ${isWinningCell ? 'winner-cell bg-yellow-100 dark:bg-yellow-900/30' : ''}
        disabled:cursor-not-allowed
      `}
      onClick={onClick}
      disabled={!!winner || !!value}
    >
      {value}
    </button>
  )
}

export default Cell