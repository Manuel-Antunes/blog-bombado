import { Popover, Transition } from '@headlessui/react'
import React from 'react'

import AppLogo from '../components/shared/AppLogo'

import { Link } from '@inertiajs/react'
import ProfilePanel from './ProfilePanel'

const BottomTabNavigation: React.FC = () => {
  return (
    <div className="w-full py-10 md:hidden">
      <footer className="border-slate-150 z-30 dark:border-navy-700 dark:bg-navy-800 fixed bottom-0 flex w-full items-center justify-between border-r bg-white px-2 py-5 ">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <AppLogo hideName />
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/">
            <a>
              <AppLogo hideName />
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          {/* Profile */}
          <Popover id="profile-wrapper" className="relative flex">
            <Popover.Button id="profile-ref" className="avatar h-12 w-12">
              <img
                className="rounded-full"
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="avatar"
              />
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
                <div id="profile-box" className="fixed bottom-14 right-2">
                  <ProfilePanel />
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </footer>
    </div>
  )
}

export default BottomTabNavigation
