import { Link } from 'react-router-dom'

type Props = {
  mistakes: number
  onResetGameSteps: () => void
}

export default function FinishGame({ mistakes, onResetGameSteps }: Props) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-5">Вітаємо! Ви пройшли всі завдання цього блоку! 🎉 🎉 🎉</p>
      <p className="text-xl text-red-500 mb-5">Помилки: { mistakes }</p>
      <div className="flex justify-center gap-[40px]">
        <Link to="/exercises" className="p-4 rounded-lg shadow">Повернутися до завдань</Link>
        <p className="p-4 rounded-lg shadow cursor-pointer" onClick={onResetGameSteps}>Пройти ще раз</p>
      </div>
    </div>
  )
}