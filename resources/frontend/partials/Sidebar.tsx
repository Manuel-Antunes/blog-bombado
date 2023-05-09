import React from 'react'

import { Popover, Transition } from '@headlessui/react'

import NavigationElement from '../components/partials/NavigationElement'

import AppLogo from '../components/shared/AppLogo'

import { Link, usePage } from '@inertiajs/react'
import { PageGlobalProps } from '../@types/page'
import { navigationElements } from '../constants/navigation'
import { useStardust } from '../contexts/Stardust'
import ProfilePanel from './ProfilePanel'

const Sidebar: React.FC = () => {
  const {
    auth: { user },
  } = usePage<PageGlobalProps>().props

  const stardust = useStardust()

  return (
    <div className="sidebar print:hidden">
      {/* Main Sidebar */}
      <div className="main-sidebar">
        <div className="border-slate-150 dark:border-navy-700 dark:bg-navy-800 flex h-full w-full flex-col items-center border-r bg-white">
          {/* Application Logo */}
          <div className="flex pt-4">
            <Link href={stardust.route('home')}>
              <AppLogo hideName />
            </Link>
          </div>
          {/* Main Sections Links */}
          <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6">
            {/* Dashobards */}

            {navigationElements.map((element) => (
              <NavigationElement
                name={element.name}
                key={element.title}
                title={element.title}
                href={element.href}
              >
                {element.children}
              </NavigationElement>
            ))}
          </div>
          {/* Bottom Links */}
          <div className="flex flex-col items-center space-y-3 py-3">
            {/* Profile */}
            <Popover id="profile-wrapper" className="relative flex">
              <Popover.Button id="profile-ref" className="avatar h-12 w-12">
                <img className="rounded-full" src={user.photo_url} alt="avatar" />
                <span className="bg-success dark:border-navy-700 absolute right-0 h-3.5 w-3.5 rounded-full border-2 border-white" />
              </Popover.Button>
              <Transition
                enter="transition duration-300 ease-out"
                enterFrom="transform translate-x-2  opacity-0"
                enterTo="transform translate-x-0 opacity-100"
                leave="transition duration-200 ease-out"
                leaveFrom="transform translate-x-0 opacity-100"
                leaveTo="transform translate-x-2 opacity-0"
              >
                <Popover.Panel>
                  <div id="profile-box" className="fixed bottom-0 left-3">
                    <ProfilePanel />
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
