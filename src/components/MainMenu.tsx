import { Bot, Users, Gamepad2 } from 'lucide-react'

interface MainMenuProps {
  isAIMode: boolean
  setIsAIMode: (value: boolean) => void
  playerMarker: 'X' | 'O'
  setPlayerMarker: (value: 'X' | 'O') => void
  aiDifficulty: 'easy' | 'medium' | 'hard'
  setAiDifficulty: (value: 'easy' | 'medium' | 'hard') => void
  onStartGame: () => void
}

function MainMenu({
  isAIMode,
  setIsAIMode,
  playerMarker,
  setPlayerMarker,
  aiDifficulty,
  setAiDifficulty,
  onStartGame
}: MainMenuProps) {
  return (
    <div className="w-full max-w-lg p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transform hover:scale-[1.02] transition-all duration-300">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="game-title text-4xl md:text-5xl mb-4 text-slate-800 dark:text-white">
            TIC TAC FUN!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            Ready for an epic battle?
          </p>
        </div>

        <div className="w-full space-y-6">
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Choose Your Battle
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsAIMode(true)}
                className={`flex items-center justify-center gap-2 p-6 rounded-xl border-4 transition-all duration-300 transform hover:scale-105
                  ${isAIMode 
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-200 dark:border-slate-700'}`}
              >
                <Bot size={24} />
                <span className="font-bold">vs AI</span>
              </button>
              <button
                onClick={() => setIsAIMode(false)}
                className={`flex items-center justify-center gap-2 p-6 rounded-xl border-4 transition-all duration-300 transform hover:scale-105
                  ${!isAIMode 
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-200 dark:border-slate-700'}`}
              >
                <Users size={24} />
                <span className="font-bold">vs Friend</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Pick Your Weapon
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPlayerMarker('X')}
                className={`p-6 rounded-xl border-4 text-3xl font-bold transition-all duration-300 transform hover:scale-105
                  ${playerMarker === 'X' 
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-200 dark:border-slate-700'}`}
              >
                X
              </button>
              <button
                onClick={() => setPlayerMarker('O')}
                className={`p-6 rounded-xl border-4 text-3xl font-bold transition-all duration-300 transform hover:scale-105
                  ${playerMarker === 'O' 
                    ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                    : 'border-slate-200 dark:border-slate-700'}`}
              >
                O
              </button>
            </div>
          </div>

          {isAIMode && (
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                AI Power Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {(['easy', 'medium', 'hard'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setAiDifficulty(level)}
                    className={`p-4 rounded-xl border-4 capitalize font-bold transition-all duration-300 transform hover:scale-105
                      ${aiDifficulty === level 
                        ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'border-slate-200 dark:border-slate-700'}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={onStartGame}
            className="w-full py-6 mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
              text-white rounded-xl font-bold text-lg flex items-center justify-center gap-3 
              transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Gamepad2 size={24} />
            START GAME!
          </button>
        </div>
      </div>
    </div>
  )
}

export default MainMenu