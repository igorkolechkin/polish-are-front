import HeaderNav from '@widgets/HeaderNav'

export default function Header() {
  return (
    <header className="min-h-[60px] flex justify-between items-center px-10 py-3 shadow-md">
      <HeaderNav />
    </header>
  )
}