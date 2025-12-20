export const ROUTES = {
  HOME: {
    url: '/',
    title: 'Головна'
  },
  EXERCISES: {
    url: '/exercises',
    title: 'Завдання'
  },
  EXERCISE: {
    url: '/exercises/:slug',
    title: 'Гра'
  }
} as const