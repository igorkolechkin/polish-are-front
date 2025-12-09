import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { Game2TypeBody } from '@shared/types/games'
import { Reorder } from 'framer-motion'
import { cn } from '@shared/lib/css.ts'

type Props = {
  data: Game2TypeBody[],
  setCurrentGame: Dispatch<SetStateAction<number>>
}

type Word = {
  id: number,
  word: string
}

function randomizedList(list: Word[]):Word[] {
  return list.sort(() => Math.random() - 0.5)
}

export default function Game2({ data, setCurrentGame }: Props) {
  const [currentItem, setCurrentItem] = useState<number>(0)
  const item: Game2TypeBody = data[currentItem]

  const correctWordList: Word[] = item.sentence
    .split(' ')
    .map((word: string, index: number) => ({ id: index, word: word }))
  const [wordsList, setWordsList] = useState<Word[]>(() =>
    [...correctWordList].sort(() => Math.random() - 0.5))

  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  function checkOrder() {
    const isOk = wordsList.every((word: Word, index: number)=>
      word.word === correctWordList[index].word)

    if (isOk) {
      setIsCorrect(true)

      setTimeout(() => {
        if (currentItem < data.length - 1) {
          const updatedCurrentItem: number = currentItem + 1
          const updatedItem: Game2TypeBody = data[updatedCurrentItem]
          const updatedCorrectWordList = updatedItem.sentence
            .split(' ')
            .map((word: string, index: number) => ({ id: index, word: word }))

          setCurrentItem(updatedCurrentItem)
          setWordsList(() => randomizedList(updatedCorrectWordList))
          setIsCorrect(false)
        } else {
          setCurrentGame((currentGame: number) => ++currentGame)
        }
      }, 1500)
    }
  }

  return (
    <>
      <div className="w-fit rounded-xl bg-white ml-auto mr-auto mb-3 px-6 py-2 text-center italic">
        { `${ currentItem + 1 } / ${ data.length }` }
      </div>
      <div className="max-w-[1200px] ml-auto mr-auto">
        <div className="flex justify-center items-center min-h-[300px] rounded-xl border shadow-sm p-6 bg-white">
          <Reorder.Group axis="x" values={ wordsList }
            onReorder={ setWordsList }
            className="flex flex-wrap gap-5"
          >
            { wordsList.map(word => (
              <Reorder.Item key={ word.id } value={ word }
                onDragEnd={ checkOrder }
                className={ cn(
                  'p-4 bg-white rounded-lg shadow cursor-grab transition-colors duration-300 ease-in-out',
                  isCorrect ? 'bg-green-500 text-white' : 'bg-white'
                ) }
              >
                { word.word }
              </Reorder.Item>
            )) }
          </Reorder.Group>
        </div>
      </div>
    </>
  )
}