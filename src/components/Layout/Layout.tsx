// src/components/Layout.tsx

import { Outlet } from 'react-router-dom'
import Header from './Header'
import {Footer} from './Footer'
import useScrollToTop from './../../UseScrollToTop'

export default function Layout() {
  useScrollToTop()

  return (
    <div className="flex min-h-screen flex-col">
      {/* Fixed / scroll-aware header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow pt-16 pb-16">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}