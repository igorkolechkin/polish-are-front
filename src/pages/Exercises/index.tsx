import { useEffect, useState } from 'react'
import type { Category, Exercise } from '@shared/types/exercises.ts'
import { getCategories, getExercisesByCategory } from '@features/exercises/api.ts'
import { ExercisesList } from '@widgets/ExercisesList'
import AsideNav from '@widgets/AsideNav'


export default function Exercises() {
  const [categories, setCategories] = useState<Category[]>([])
  const [currentCategory, setCurrentCategory] = useState<number | null>(null)

  const [exercises, setExercises] = useState<Exercise[] | null>(null)

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  function changedCategory(id: number): void {
    if (currentCategory === id) return

    setCurrentCategory(id)
    getExercisesByCategory(id).then(setExercises)
  }

  return (
    <div className="flex flex-1">
      <aside className="min-w-80 px-10 py-5 shadow-md">
        <AsideNav
          categories={ categories }
          currentCategory={ currentCategory }
          changedCategory={ changedCategory }
        />
      </aside>
      <main className="flex-1 px-10 py-5">
        <ExercisesList exercises={ exercises } />
      </main>
    </div>
  )
}