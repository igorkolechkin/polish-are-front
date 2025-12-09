import { Link } from 'react-router-dom'

export default function FinishGame() {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold mb-5">Вітаємо! Ви пройшли всі завдання цього блоку! 🎉 🎉 🎉</p>
      <div className="flex justify-center gap-[40px]">
        <Link to="/exercises" className="p-4 rounded-lg shadow">Повернутися до завдань</Link>
        <p className="p-4 rounded-lg shadow">Пройти ще раз</p>
      </div>
    </div>
  )
}