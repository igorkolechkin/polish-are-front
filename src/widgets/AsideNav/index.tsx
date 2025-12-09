import { Card, CardContent } from '@shared/ui/kit/card.tsx'
import { motion } from 'framer-motion'
import type { Category } from '@shared/types/exercises.ts'

type Props = {
  categories: Category[],
  currentCategory: number | null,
  changedCategory: (id: number) => void
}

export default function AsideNav({ categories, currentCategory, changedCategory }: Props) {
  return (
    <>
      <p className="text-lg font-bold text-center">Рiвнi:</p>
      <nav className="flex flex-col gap-6 mt-6">
        { categories.map(cat => (
          <Card
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
        )) }
      </nav>
    </>
  )
}