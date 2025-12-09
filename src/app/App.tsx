import { Outlet } from 'react-router-dom'
import Header from '@widgets/Header'

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

