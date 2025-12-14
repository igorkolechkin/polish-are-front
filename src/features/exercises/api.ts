import base from '@shared/api/base.ts'
import type { Category, Exercise, ExerciseApi, ExerciseInfo } from '@shared/types/exercises'
import type { GameBlock, GameBlockApi } from '@shared/types/games'

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await base.get('/exercises_cat')

    if (!data) return []

    return data.map((cat: Category): Category => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      count: cat.count
    }))
  } catch (error) {
    console.error('Ошибка при получении категорий:', error)
    return []
  }
}

export const getExercisesByCategory = async (catId: number): Promise<Exercise[]> => {
  try {
    const { data } = await base.get(`/exercises?exercises_cat=${ catId }&per_page=100`)
    if (!data) return []

    return data.map((exercise: ExerciseApi): Exercise => ({
      id: exercise.id,
      status: exercise.status,
      title: exercise.title.rendered,
      excerpt: exercise.excerpt.rendered.replace(/<[^>]+>/g, ''),
      slug: exercise.slug
    }))
  } catch (error) {
    console.error('Ошибка при получении упражнений:', error)
    return []
  }
}

export const getExercise = async (slug: string): Promise<ExerciseInfo | null> => {
  try {
    const res = await base.get(`/exercises?slug=${ slug }`)
    const data = res.data[0]

    if (!data) return null

    return {
      title: data?.title.rendered,
      gamesList: data?.acf?.gamesList.map((games: GameBlockApi): GameBlock => ({
        name: games?.acf_fc_layout,
        list: games?.list
      }))
    }
  } catch (error) {
    console.error('Ошибка при получении данных упражнения:', error)
    return null
  }
}
