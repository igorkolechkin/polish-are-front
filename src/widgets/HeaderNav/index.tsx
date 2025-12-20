import { Link } from 'react-router-dom'
import { ROUTES } from '@shared/types/routes.ts'
import { Button } from '@shared/ui/kit/button.tsx'

export default function HeaderNav() {
  return (
    <nav className="flex gap-5">
      <Button asChild variant="link" className="p-0 h-auto hover:text-blue-800">
        <Link to={ ROUTES.HOME.url }>
          { ROUTES.HOME.title }
        </Link>
      </Button>
      <Button asChild variant="link" className="p-0 h-auto hover:text-blue-800">
        <Link to={ ROUTES.EXERCISES.url }>
          { ROUTES.EXERCISES.title }
        </Link>
      </Button>
    </nav>
  )
}