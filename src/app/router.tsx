import { createBrowserRouter } from 'react-router-dom'
import App from '@app/App.tsx'
import { ROUTES } from '@shared/types/routes.ts'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: ROUTES.HOME,
        lazy: () =>
          import('@pages/Home').then(module => ({
            Component: module.default
          }))
      },
      {
        path: ROUTES.EXERCISES,
        lazy: () =>
          import('@pages/Exercises').then(module => ({
            Component: module.default
          }))
      },
      {
        path: ROUTES.EXERCISE,
        lazy: () =>
          import('@pages/Exercise').then(module => ({
            Component: module.default
          }))
      }
    ]
  }
])