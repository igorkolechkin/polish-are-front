import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getExercise } from '@features/exercises/api.ts'
import type { ExerciseDataType, ExerciseInfo } from '@shared/types/exercises.ts'
import { GameComponent } from '@pages/Exercise/GameRenderer.tsx'
import FinishGame from '@pages/Exercise/FinishGame.tsx'
import Loader from '@widgets/other/Loader.tsx'

const defaultExerciseData = {
  mistakes: 0,
  timeStart: performance.now(),
  currentGame: 0,
  currentGameItem: 0,
  gameLength: 0
}

export default function Exercise() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [content, setContent] = useState<ExerciseInfo | null>(null)
  const [exerciseData, setExerciseData] = useState<ExerciseDataType>(defaultExerciseData)

  useEffect(() => {
    if (!params.slug) return

    getExercise(params.slug)
      .then((content: ExerciseInfo | null) => {
        setExerciseData((data: ExerciseDataType) => ({
          ...data,
          gameLength: content?.gamesList[data.currentGame]?.list.length ?? 0
        }))

        return setContent(content)
      })
      .finally(() => setIsLoading(false))
  }, [params.slug, exerciseData.currentGame])

  const currentGameItem: number = exerciseData.currentGameItem
  const currentGame: number = exerciseData.currentGame
  const gameLength: number = content?.gamesList[currentGame]?.list.length ?? 0
  const gamesLength: number = content?.gamesList.length ?? 0

  function onGameStepsHandler() {
    if (currentGameItem < gameLength - 1) {
      setExerciseData((data: ExerciseDataType)=> ({
        ...data,
        currentGameItem: data.currentGameItem + 1
      }))
    } else {
      setExerciseData((data: ExerciseDataType)=> ({
        ...data,
        currentGame: data.currentGame + 1,
        currentGameItem: 0
      }))
    }
  }

  function onResetGameSteps() {
    setExerciseData({
      ...defaultExerciseData,
      gameLength: content?.gamesList[0]?.list.length ?? 0
    })
  }

  return (
    <div className="flex flex-1">
      <main className="flex-1 px-10 py-5">
        <div className="flex flex-col justify-center items-center rounded-xl shadow-sm border-2 p-10 min-h-full bg-muted relative">
          { isLoading && <Loader /> }

          { (!isLoading && !content) && <p className="italic text-center">Вiдсутнiй контент</p> }

          { (!isLoading && content) &&
            (<>
              { gamesLength > currentGame &&
                <p className="text-2xl font-bold text-center mb-10">{ content.title }</p> }

              { gamesLength > currentGame
                ? <GameComponent
                  exerciseData={ exerciseData }
                  gameData={ content.gamesList[currentGame].list[currentGameItem] }
                  gameName={ content.gamesList[currentGame].name }
                  onGameStepsHandler={ onGameStepsHandler }
                  setExerciseData={ setExerciseData }
                />
                : <FinishGame
                  timeStart={ exerciseData.timeStart }
                  mistakes={ exerciseData.mistakes }
                  onResetGameSteps={ onResetGameSteps }
                />
              }
            </>)
          }
        </div>
      </main>
    </div>
  )
}