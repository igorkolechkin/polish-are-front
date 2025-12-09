import type { Dispatch, SetStateAction } from 'react'
import type { Game1TypeBody } from '@shared/types/games'
import { Button } from '@shared/ui/kit/button.tsx'
import { useState } from 'react'

type Props = {
  data: Game1TypeBody[],
  setCurrentGame: Dispatch<SetStateAction<number>>
}

export default function Game1({ data, setCurrentGame }: Props) {
  const [currentItem, setCurrentItem] = useState<number>(0)
  const item: Game1TypeBody = data[currentItem]

  const [selected, setSelected] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  const sentence = item.sentence.replace(item.correctWord, '____')

  function handleSelect(word: string) {
    setSelected(word)
    setIsCorrect(word === item.correctWord)

    if (word === item.correctWord) {
      setTimeout(() => {
        if (currentItem < data.length - 1) {
          setCurrentItem((item: number) => ++item)
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
      <div className="flex gap-4 max-w-[1100px] ml-auto mr-auto">
        <div className="flex-2/3 flex items-center justify-center rounded-xl border shadow-sm p-6 bg-white">
          <p className="text-2xl">{ sentence }</p>
        </div>
        <div className="flex-1/3 flex flex-col gap-4 rounded-xl border shadow-sm p-6 bg-white">
          { item.wordVariants.map(variant => (
            <Button
              key={ variant.word }
              className="cursor-pointer text-lg p-5 transition-colors duration-300 ease-in-out data-[cor=s]:bg-green-500 data-[cor=s]:text-white data-[cor=w]:bg-red-500 data-[cor=w]:text-white"
              variant="outline"
              data-cor={ (selected === variant.word) && (isCorrect ? 's' : 'w') }
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