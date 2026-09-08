import { Outlet } from 'react-router-dom'
import { BottomNav } from '../components/layout/BottomNav'

export function RootLayout() {
  return (
    <div className="mx-auto flex min-h-svh max-w-md flex-col pb-16">
      <main className="flex-1">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
