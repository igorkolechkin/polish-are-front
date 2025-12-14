import { type Dispatch, type SetStateAction, useState } from 'react'
import type { Game1TypeBody } from '@shared/types/games'
import type { ExerciseDataType } from '@shared/types/exercises.ts'
import { Button } from '@shared/ui/kit/button.tsx'
import { cn } from '@shared/lib/css.ts'

type Props = {
  exerciseData: ExerciseDataType,
  gameData: Game1TypeBody,
  onGameStepsHandler: () => void,
  setExerciseData: Dispatch<SetStateAction<ExerciseDataType>>
}

type IsCorrectType = 'default' | 'wrong' | 'success'

export default function Game1({ exerciseData, gameData, onGameStepsHandler, setExerciseData }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<IsCorrectType>('default')
  const [isLocked, setIsLocked] = useState<boolean>(false)

  const sentence = gameData.sentence.replace(gameData.correctWord, '____')

  function handleSelect(word: string) {
    if (isLocked) return

    setSelected(word)
    setIsLocked(true)

    if (word === gameData.correctWord) {
      setIsCorrect('success')

      setTimeout(() => {
        onGameStepsHandler()

        setIsLocked(false)
        setIsCorrect('default')
      }, 1500)
    } else {
      setIsCorrect('wrong')

      setExerciseData((data: ExerciseDataType) => ({
        ...data,
        mistakes: data.mistakes + 1
      }))

      setTimeout(() => {
        setIsCorrect('default')
        setIsLocked(false)
      },1000)
    }
  }

  return (
    <>
      <div className="w-fit rounded-xl bg-white ml-auto mr-auto mb-3 px-6 py-2 text-center italic">
        { `${ exerciseData.currentGameItem + 1 } / ${ exerciseData.gameLength }` }
      </div>

      <div className="flex gap-4 max-w-[1100px] w-full ml-auto mr-auto">
        <div className="flex-2/3 flex items-center justify-center rounded-xl border shadow-sm p-6 bg-white">
          <p className="text-2xl">{ sentence }</p>
        </div>

        <div className="flex-1/3 flex flex-col gap-4 rounded-xl border shadow-sm p-6 bg-white">
          { gameData.wordVariants.map(variant => (
            <Button
              key={ variant.word }
              variant="outline"
              className={ cn(
                'cursor-pointer p-5 text-lg transition-colors bg-white',
                selected === variant.word && isCorrect === 'success' && 'bg-green-500 text-white hover:bg-green-550 hover:text-white',
                selected === variant.word && isCorrect === 'wrong' && 'bg-red-500 text-white hover:bg-red-550 hover:text-white',
                isLocked && 'pointer-events-none'
              ) }
              onClick={ () => handleSelect(variant.word) }
            >
              { variant.word }
            </Button>
          )) }
        </div>
      </div>
    </>
  )
}