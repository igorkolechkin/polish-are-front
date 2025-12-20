import { Navigate } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Navigate to={'/exercises'} />
    </>
  )
}