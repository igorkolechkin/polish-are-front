import * as React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { GameBlock } from '@shared/types/games.ts'
import Game1 from '@features/games/Game1'
import Game2 from '@features/games/Game2'

type Props = {
  currentGame: number
  gamesList: GameBlock[],
  setCurrentGame: Dispatch<SetStateAction<number>>
}

type GameName = 'game-1' | 'game-2'

export function GameComponent({ gamesList, currentGame, setCurrentGame }: Props) {
  const gamesMap: Record<GameName, React.FC<any>> = {
    'game-1': Game1,
    'game-2': Game2
  }

  function getCurrentGame() {
    if (!gamesList) return null

    const currentGameData: GameBlock = gamesList[currentGame]
    const currentGameName: string = currentGameData?.name

    const Component = gamesMap[currentGameName]

    return <Component
      data={ currentGameData.list }
      setCurrentGame={ setCurrentGame }
    />
  }

  return getCurrentGame()
}
