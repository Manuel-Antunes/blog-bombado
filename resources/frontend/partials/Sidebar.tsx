import React from 'react'

import { Popover, Transition } from '@headlessui/react'

import SidebarElement from '../components/partials/SidebarElement'

import AppLogo from '../components/shared/AppLogo'

import { Link } from '@inertiajs/react'
import ProfilePanel from './ProfilePanel'

const sidebarElements = [
  {
    title: 'Home',
    href: '/',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 14.0585C5 13.0494 5 12.5448 5.22166 12.1141C5.44333 11.6833 5.8539 11.3901 6.67505 10.8035L10.8375 7.83034C11.3989 7.42938 11.6795 7.2289 12 7.2289C12.3205 7.2289 12.6011 7.42938 13.1625 7.83034L17.325 10.8035C18.1461 11.3901 18.5567 11.6833 18.7783 12.1141C19 12.5448 19 13.0494 19 14.0585V19C19 19.9428 19 20.4142 18.7071 20.7071C18.4142 21 17.9428 21 17 21H7C6.05719 21 5.58579 21 5.29289 20.7071C5 20.4142 5 19.9428 5 19V14.0585Z"
          fillOpacity="0.3"
          className="dark:fill-navy-200 fill-slate-500"
        />
        <path
          d="M3 12.3866C3 12.6535 3 12.7869 3.0841 12.8281C3.16819 12.8692 3.27352 12.7873 3.48418 12.6234L10.7721 6.95502C11.362 6.49625 11.6569 6.26686 12 6.26686C12.3431 6.26686 12.638 6.49625 13.2279 6.95502L20.5158 12.6234C20.7265 12.7873 20.8318 12.8692 20.9159 12.8281C21 12.7869 21 12.6535 21 12.3866V11.9782C21 11.4978 21 11.2576 20.8983 11.0497C20.7966 10.8418 20.607 10.6944 20.2279 10.3995L13.2279 4.95502C12.638 4.49625 12.3431 4.26686 12 4.26686C11.6569 4.26686 11.362 4.49625 10.7721 4.95502L3.77212 10.3995C3.39295 10.6944 3.20337 10.8418 3.10168 11.0497C3 11.2576 3 11.4978 3 11.9782V12.3866Z"
          className="dark:fill-navy-200 fill-slate-500"
        />
        <path
          d="M12.5 15H11.5C10.3954 15 9.5 15.8954 9.5 17V20.85C9.5 20.9328 9.56716 21 9.65 21H14.35C14.4328 21 14.5 20.9328 14.5 20.85V17C14.5 15.8954 13.6046 15 12.5 15Z"
          className="dark:fill-navy-200 fill-slate-500"
        />
        <rect
          x={16}
          y={5}
          width={2}
          height={4}
          rx="0.5"
          className="dark:fill-navy-200 fill-slate-500"
        />
      </svg>
    ),
  },
]

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar print:hidden">
      {/* Main Sidebar */}
      <div className="main-sidebar">
        <div className="border-slate-150 dark:border-navy-700 dark:bg-navy-800 flex h-full w-full flex-col items-center border-r bg-white">
          {/* Application Logo */}
          <div className="flex pt-4">
            <Link href="/">
              <AppLogo hideName />
            </Link>
          </div>
          {/* Main Sections Links */}
          <div className="is-scrollbar-hidden flex grow flex-col space-y-4 overflow-y-auto pt-6">
            {/* Dashobards */}

            {sidebarElements.map((element) => (
              <SidebarElement key={element.title} title={element.title} href={element.href}>
                {element.icon}
              </SidebarElement>
            ))}
          </div>
          {/* Bottom Links */}
          <div className="flex flex-col items-center space-y-3 py-3">
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
