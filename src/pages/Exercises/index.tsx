import { useEffect, useState } from 'react'
import type { Category, Exercise } from '@shared/types/exercises.ts'
import { getCategories, getExercisesByCategory } from '@features/exercises/api.ts'
import { ExercisesList } from '@widgets/ExercisesList'
import AsideNav from '@widgets/AsideNav'

type isLoadingType = {
  category: boolean,
  exercises: boolean
}

export default function Exercises() {
  const [isLoading, setIsLoading] = useState<isLoadingType>({ category: true, exercises: true })
  const [categories, setCategories] = useState<Category[]>([])
  const [exercises, setExercises] = useState<Exercise[] | null>(null)

  const currentCategory: number = Number(localStorage.getItem('currentCategory') ?? 2)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setIsLoading(data => ({ ...data, category: false })))
  }, [])

  useEffect(() => {
    getExercisesByCategory(currentCategory)
      .then(setExercises)
      .finally(() => setIsLoading(data => ({ ...data, exercises: false })))
  }, [currentCategory])

  function changedCategory(id: number): void {
    if (currentCategory === id) return

    localStorage.setItem('currentCategory', String(id))
    setIsLoading(data => ({ ...data, exercises: true }))
  }

  return (
    <div className="flex flex-1">
      <aside className="min-w-80 flex flex-col px-10 py-5 shadow-md">
        <AsideNav
          categories={ categories }
          currentCategory={ currentCategory }
          changedCategory={ changedCategory }
          isLoading={ isLoading.category }
        />
      </aside>
      <main className="flex-1 flex flex-col px-10 py-5">
        <p className="text-2xl font-bold text-center">Завдання</p>
        <ExercisesList
          exercises={ exercises }
          isLoading={ isLoading.exercises }
        />
      </main>
    </div>
  )
}