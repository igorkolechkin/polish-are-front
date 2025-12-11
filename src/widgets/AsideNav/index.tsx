import { Card, CardContent } from '@shared/ui/kit/card.tsx'
import type { Category } from '@shared/types/exercises.ts'
import Loader from '@widgets/other/Loader.tsx'

type Props = {
  categories: Category[],
  currentCategory: number,
  changedCategory: (id: number) => void,
  isLoading: boolean
}

export default function AsideNav({ categories, currentCategory, changedCategory, isLoading }: Props) {
  return (
    <>
      <p className="text-lg font-bold text-center">Рiвнi:</p>
      <nav className="h-full flex flex-col gap-6 mt-6 relative">
        { !isLoading
          ? categories.map(cat => (
            <Card
              key={ cat.name }
              onClick={ () => changedCategory(cat.id) }
              className={ `
                cursor-pointer text-center transition-all border-2 p-0 min-h-[80px] hover:border-primary hover:bg-muted
                ${ currentCategory === cat.id ? 'border-primary bg-muted' : 'border-transparent' }
              ` }
            >
              <CardContent className="p-4 m-auto">
                <p className="text-lg">{ cat.name }</p>
              </CardContent>
            </Card>
          ))
          : <Loader />
        }
      </nav>
    </>
  )
}