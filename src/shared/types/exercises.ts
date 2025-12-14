import type { GameBlock } from '@shared/types/games.ts'

export type Category = {
  id: number,
  name: string,
  slug: string,
  count: number
}

export interface ExerciseApi {
  id: number,
  status: string,
  slug: string,
  title: {
    rendered: string
  },
  excerpt: {
    rendered: string
  }
}

export interface Exercise extends Omit<ExerciseApi, 'title' | 'excerpt'> {
  title: string,
  excerpt: string
}

export type ExerciseInfo = {
  title: string,
  gamesList: GameBlock[]
}

export type ExerciseDataType = {
  mistakes: number,
  time: number,
  currentGame: number,
  currentGameItem: number,
  gameLength: number
}