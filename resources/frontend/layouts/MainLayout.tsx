import React, { PropsWithChildren, useEffect } from 'react'

import BottomTabNavigation from '../partials/BottomTabNavigation'

import Flash from '../partials/Flash'
import Navbar from '../partials/Navbar'
import Sidebar from '../partials/Sidebar'
import { useFirebase } from '../hooks/useFirebase'

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { initNotifications } = useFirebase()

  useEffect(() => {
    if (initNotifications) {
      initNotifications()
    }
  }, [initNotifications])

  return (
    <>
      <div className="min-h-100vh is-header-blur dark:bg-navy-900 flex grow bg-slate-50">
        <Sidebar />
        <Navbar />
        <Flash />
        <main className="main-content w-full px-[var(--margin-x)] pb-8">{children}</main>
      </div>
      <BottomTabNavigation />
    </>
  )
}

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex items-center justify-between py-3 pb-5 lg:pb-6">{children}</div>
}

export default Object.assign(MainLayout, { Header })
