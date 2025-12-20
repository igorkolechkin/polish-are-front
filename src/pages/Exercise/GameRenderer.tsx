import type { GameBlockBody } from '@shared/types/games.ts'
import type { ExerciseDataType } from '@shared/types/exercises.ts'
import Game1 from '@features/games/Game1'
import Game2 from '@features/games/Game2'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  exerciseData: ExerciseDataType,
  gameData: GameBlockBody,
  gameName: string,
  onGameStepsHandler: () => void
  setExerciseData: Dispatch<SetStateAction<ExerciseDataType>>
}

const gamesMap = {
  'game-1': Game1,
  'game-2': Game2
}

export function GameComponent({ exerciseData, gameData, gameName, onGameStepsHandler, setExerciseData }: Props) {
  // @ts-ignore
  const Component = gamesMap[gameName]

  return <Component
    exerciseData={ exerciseData }
    gameData={ gameData }
    onGameStepsHandler={ onGameStepsHandler }
    setExerciseData={ setExerciseData }
  />
}
