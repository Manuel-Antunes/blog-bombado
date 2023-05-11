import { Popover, Transition } from '@headlessui/react'
import React from 'react'

import AppLogo from '../components/shared/AppLogo'

import { Link, usePage } from '@inertiajs/react'
import { PageGlobalProps } from '../@types/page'
import { useStardust } from '../contexts/Stardust'
import NotificationsBox from './NotificationsBox'

const Navbar: React.FC = () => {
  const stardust = useStardust()

  const {
    props: {
      auth: { notifications },
    },
  } = usePage<PageGlobalProps>()

  return (
    <nav className="header print:hidden">
      {/* App Header  */}
      <div className="header-container dark:bg-navy-700 relative flex w-full bg-white print:hidden">
        {/* Header Items */}
        <div className="flex w-full items-center justify-between">
          <div>
            <Link href={stardust.route('home')} className="md:hidden">
              <AppLogo hideName />
            </Link>
          </div>
          <div className="-mr-1.5 flex items-center space-x-2">
            <Popover id="notification-wrapper" className="flex">
              <Popover.Button
                id="notification-ref"
                className="btn dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 relative h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="dark:text-navy-100 h-5 w-5 text-slate-500"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15.375 17.556h-6.75m6.75 0H21l-1.58-1.562a2.254 2.254 0 01-.67-1.596v-3.51a6.612 6.612 0 00-1.238-3.85 6.744 6.744 0 00-3.262-2.437v-.379c0-.59-.237-1.154-.659-1.571A2.265 2.265 0 0012 2c-.597 0-1.169.234-1.591.65a2.208 2.208 0 00-.659 1.572v.38c-2.621.915-4.5 3.385-4.5 6.287v3.51c0 .598-.24 1.172-.67 1.595L3 17.556h12.375zm0 0v1.11c0 .885-.356 1.733-.989 2.358A3.397 3.397 0 0112 22a3.397 3.397 0 01-2.386-.976 3.313 3.313 0 01-.989-2.357v-1.111h6.75z"
                  />
                </svg>
                {notifications?.length ? (
                  <span className="absolute -top-px -right-px flex h-3 w-3 items-center justify-center">
                    <span className="bg-secondary absolute inline-flex h-full w-full animate-ping rounded-full opacity-80" />
                    <span className="bg-secondary inline-flex h-2 w-2 rounded-full" />
                  </span>
                ) : undefined}
              </Popover.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform translate-y-2  opacity-0"
                enterTo="transform translate-y-0 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform translate-y-0 opacity-100"
                leaveTo="transform translate-y-2 opacity-0"
              >
                <Popover.Panel>
                  <div className="relative">
                    <NotificationsBox />
                  </div>
                </Popover.Panel>
              </Transition>
              {/* <NotificationsBox /> */}
            </Popover>
            {/* Right Sidebar Toggle */}
            {/* <button
              data-toggle="drawer"
              data-target="#right-sidebar"
              className="btn dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5.5 w-5.5 dark:text-navy-100 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
