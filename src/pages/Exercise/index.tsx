import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getExercise } from '@features/exercises/api.ts'
import type { ExerciseInfo } from '@shared/types/exercises.ts'
import { GameComponent } from '@pages/Exercise/GameRenderer.tsx'
import FinishGame from '@pages/Exercise/FinishGame.tsx'

export default function Exercise() {
  const params = useParams()
  const [content, setContent] = useState<ExerciseInfo | null>(null)
  const [currentGame, setCurrentGame] = useState<number>(0)

  useEffect(() => {
    if (!params.slug) return

    getExercise(params.slug).then(setContent)
  }, [params.slug])

  return (
    <div className="flex flex-1">
      <main className="flex-1 px-10 py-5">
        <div className="rounded-xl shadow-sm border-2 p-10 min-h-full bg-muted">
          { !content && <p className="italic text-center">Вiдсутнiй контент</p> }

          { content &&
            <div>
              { content.gamesList.length > currentGame &&
                <p className="text-2xl font-bold text-center mb-10">{ content.title }</p> }

              { content.gamesList.length > currentGame
                ? <GameComponent
                  gamesList={ content.gamesList }
                  currentGame={ currentGame }
                  setCurrentGame={ setCurrentGame }
                />
                : <FinishGame />
              }
            </div>
          }
        </div>
      </main>
    </div>
  )
}