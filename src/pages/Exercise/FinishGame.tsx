import { Link } from 'react-router-dom'

type Props = {
  timeStart: number,
  mistakes: number
  onResetGameSteps: () => void
}

function getTime(timeStart: number) {
  const duration = (performance.now() - timeStart) / 1000

  return {
    minutes: Math.floor(duration / 60),
    seconds: Math.ceil(duration % 60)
  }
}

export default function FinishGame({ timeStart, mistakes, onResetGameSteps }: Props) {
  const time = getTime(timeStart)

  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-5">Вітаємо! Ви пройшли всі завдання цього блоку! 🎉 🎉 🎉</p>
      <p className="text-xl text-green-500 mb-5">Час: { time.minutes > 0 && `${time.minutes}хв.` } { time.seconds }с.</p>
      <p className="text-xl text-red-500 mb-5">Помилки: { mistakes }</p>
      <div className="flex justify-center gap-[40px]">
        <Link to="/exercises" className="p-4 rounded-lg shadow">Повернутися до завдань</Link>
        <p className="p-4 rounded-lg shadow cursor-pointer" onClick={onResetGameSteps}>Пройти ще раз</p>
      </div>
    </div>
  )
}
