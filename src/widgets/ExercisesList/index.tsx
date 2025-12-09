import type { Exercise } from '@shared/types/exercises.ts'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@shared/ui/kit/card.tsx'
import { Button } from '@shared/ui/kit/button.tsx'
import { Link } from 'react-router-dom'

type Props = {
  exercises: Exercise[] | null
}

export function ExercisesList({ exercises }: Props) {

  return (
    <>
      <p className="text-2xl font-bold text-center">Завдання</p>
      { exercises && <div className="mt-10">
        { exercises.length
          ? <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            { exercises.map((exercise: Exercise) => (
              <Card key={ exercise.id }>
                <CardHeader>
                  <CardTitle>{ exercise.title }</CardTitle>
                  <CardDescription>{ exercise.excerpt }</CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button asChild className="cursor-pointer">
                    <Link to={ exercise.slug }>Грати</Link>
                  </Button>
                </CardFooter>
              </Card>
            )) }
          </ul>
          : <p className="italic text-center">У обраному рiвнi вiдсутнi задвання</p>
        }
      </div> }
    </>
  )
}