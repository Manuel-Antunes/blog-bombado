import React from 'react'

import Breadcrumbs from '../components/shared/Breadcrumbs'
import AppProviders from '../partials/AppProviders'
import BottomTabNavigation from '../partials/BottomTabNavigation'

import Navbar from '../partials/Navbar'
import Sidebar from '../partials/Sidebar'

interface MainLayoutProps {
  children: React.ReactNode
}

interface MainLayoutHeaderProps {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <AppProviders>
      <div className="min-h-100vh is-header-blur dark:bg-navy-900 flex grow bg-slate-50">
        <Sidebar />
        <Navbar />
        <main className="main-content w-full px-[var(--margin-x)] pb-8">
          <div className="mt-10">
            <Breadcrumbs />
          </div>
          {children}
        </main>
      </div>
      <BottomTabNavigation />
    </AppProviders>
  )
}

const Header: React.FC<MainLayoutHeaderProps> = ({ children }) => {
  return <div className="flex items-center justify-between py-3 pb-5 lg:pb-6">{children}</div>
}

export default Object.assign(MainLayout, { Header })
