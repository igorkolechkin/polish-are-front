import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import type { Game2TypeBody } from '@shared/types/games'
import { Reorder } from 'framer-motion'
import { cn } from '@shared/lib/css.ts'
import type { ExerciseDataType } from '@shared/types/exercises.ts'
import { Button } from '@shared/ui/kit/button.tsx'

type Props = {
  exerciseData: ExerciseDataType,
  gameData: Game2TypeBody,
  onGameStepsHandler: () => void,
  setExerciseData: Dispatch<SetStateAction<ExerciseDataType>>
}

type Word = {
  id: number,
  word: string
}

type IsCorrectType = 'default' | 'wrong' | 'success'

function getWordsList(str: string): Word[] {
  return str.split(' ').map((word: string, index: number) => ({ id: index, word: word }))
}

function checkOrderList(newWordList: Word[], wordList: Word[]) {
  return newWordList.every((word: Word, index: number)=> word.word === wordList[index].word)
}

function shuffle(list: Word[]):Word[] {
  const result = [...list]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]];
  }

  return result
}

function generateShuffledList(sentence: string): Word[] {
  const correct = getWordsList(sentence)

  let shuffled: Word[]

  do {
    shuffled = shuffle(correct)
  } while (checkOrderList(shuffled, correct))

  return shuffled
}

export default function Game2({ exerciseData, gameData, onGameStepsHandler, setExerciseData }: Props) {
  const correctWordList: Word[] = getWordsList(gameData.sentence)
  const [wordsList, setWordsList] = useState<Word[]>(generateShuffledList(gameData.sentence))
  const [isCorrect, setIsCorrect] = useState<IsCorrectType>('default')
  const [isLocked, setIsLocked] = useState<boolean>(false)

  useEffect(() => {
    setWordsList(generateShuffledList(gameData.sentence))
  }, [gameData.sentence])

  function checkOrder() {
    if (isLocked) return

    const isOk = checkOrderList(wordsList, correctWordList)
    setIsLocked(true)

    if (isOk) {
      setIsCorrect('success')

      setTimeout(() => {
        onGameStepsHandler()

        setIsCorrect('default')
        setIsLocked(false)
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

      <div className="max-w-[1200px] w-full ml-auto mr-auto">
        <div className="flex justify-center items-center min-h-[300px] rounded-xl border shadow-sm p-6 bg-white">
          <Reorder.Group axis="x" values={ wordsList }
            onReorder={ setWordsList }
            className="flex flex-wrap gap-5"
          >
            { wordsList.map(word => (
              <Reorder.Item
                key={ word.id } value={ word }
                className={ cn(
                  'p-4 bg-white rounded-lg shadow cursor-grab transition-colors duration-300 ease-in-out',
                  isCorrect === 'success' && 'bg-green-500 text-white',
                  isCorrect === 'wrong' && 'bg-red-500 text-white',
                  isLocked && 'pointer-events-none'
                ) }
              >
                { word.word }
              </Reorder.Item>
            )) }
          </Reorder.Group>
        </div>

        <Button
          variant="outline"
          disabled={ isLocked }
          onClick={ () => checkOrder() }
          className="flex mt-6 ml-auto mr-auto p-6 d-flex cursor-pointer text-xl"
        >
          Перевiрити
        </Button>
      </div>
    </>
  )
}