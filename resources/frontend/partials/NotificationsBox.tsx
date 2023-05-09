import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'
import noImages from 'resources/frontend/assets/images/illustrations/empty-girl-box.svg'

const NotificationsBox: React.FC = () => {
  return (
    <div id="notification-box" className="absolute -right-18 z-50 md:right-0 top-12">
      <div className="notification-tab-wrapper popper-box border-slate-150 shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg border bg-white sm:m-0 sm:w-80">
        <Tab.Group>
          <div className="dark:bg-navy-800 dark:text-navy-200 rounded-t-lg bg-slate-100 text-slate-600">
            <div className="flex items-center justify-between px-4 pt-2">
              <div className="flex items-center space-x-2">
                <h3 className="dark:text-navy-100 font-medium text-slate-700">Notifications</h3>
                <div className="badge bg-primary/10 text-primary dark:bg-accent-light/15 dark:text-accent-light h-5 rounded-full px-1.5">
                  26
                </div>
              </div>
              <button className="btn dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
            </div>
            <Tab.List className="tabs is-scrollbar-hidden flex shrink-0 overflow-x-auto px-3">
              <Tab>
                {({ selected }) => (
                  <span
                    className={clsx('tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5', {
                      'border-primary dark:border-accent text-primary dark:text-accent-light':
                        selected,
                      'dark:hover:text-navy-100 dark:focus:text-navy-100 border-transparent hover:text-slate-800 focus:text-slate-800':
                        !selected,
                    })}
                  >
                    All
                  </span>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <span
                    className={clsx('tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5', {
                      'border-primary dark:border-accent text-primary dark:text-accent-light':
                        selected,
                      'dark:hover:text-navy-100 dark:focus:text-navy-100 border-transparent hover:text-slate-800 focus:text-slate-800':
                        !selected,
                    })}
                  >
                    Alerts
                  </span>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <span
                    className={clsx('tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5', {
                      'border-primary dark:border-accent text-primary dark:text-accent-light':
                        selected,
                      'dark:hover:text-navy-100 dark:focus:text-navy-100 border-transparent hover:text-slate-800 focus:text-slate-800':
                        !selected,
                    })}
                  >
                    Events
                  </span>
                )}
              </Tab>
              <Tab>
                {({ selected }) => (
                  <span
                    className={clsx('tab btn shrink-0 rounded-none border-b-2 px-3.5 py-2.5', {
                      'border-primary dark:border-accent text-primary dark:text-accent-light':
                        selected,
                      'dark:hover:text-navy-100 dark:focus:text-navy-100 border-transparent hover:text-slate-800 focus:text-slate-800':
                        !selected,
                    })}
                  >
                    Logs
                  </span>
                )}
              </Tab>
            </Tab.List>
          </div>
          <Tab.Panels className="flex flex-col overflow-hidden">
            <Tab.Panel
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4"
              id="notification-all"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 dark:bg-secondary-light/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-user-edit text-secondary dark:text-secondary-light" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    User Photo Changed
                  </p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    John Doe changed his avatar photo
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 dark:bg-info/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    Mon, June 14, 2021
                  </p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">08:00 - 09:00</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Frontend Conf</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 dark:bg-accent-light/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa-solid fa-image text-primary dark:text-accent-light" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Images Added</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Mores Clarke added new image gallery
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 dark:bg-success/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-leaf text-success" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Design Completed</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Robert Nolan completed the design of the CRM application
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 dark:bg-info/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    Wed, June 21, 2021
                  </p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">16:00 - 20:00</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">UI/UX Conf</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 dark:bg-warning/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-project-diagram text-warning" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">ER Diagram</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Team completed the ER diagram app
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 dark:bg-warning/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-warning h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">THU, May 11, 2021</p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">10:00 - 11:30</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Interview, Konnor Guzman</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-error/10 dark:bg-error/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-history text-error" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Weekly Report</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    The weekly report was uploaded
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              id="notification-alerts"
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-secondary/10 dark:bg-secondary-light/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-user-edit text-secondary dark:text-secondary-light" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    User Photo Changed
                  </p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    John Doe changed his avatar photo
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-primary/10 dark:bg-accent-light/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa-solid fa-image text-primary dark:text-accent-light" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Images Added</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Mores Clarke added new image gallery
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-success/10 dark:bg-success/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-leaf text-success" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Design Completed</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Robert Nolan completed the design of the CRM application
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 dark:bg-warning/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-project-diagram text-warning" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">ER Diagram</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    Team completed the ER diagram app
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-error/10 dark:bg-error/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <i className="fa fa-history text-error" />
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Weekly Report</p>
                  <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
                    The weekly report was uploaded
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              id="notification-events"
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4 py-4"
            >
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 dark:bg-info/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    Mon, June 14, 2021
                  </p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">08:00 - 09:00</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Frontend Conf</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 dark:bg-info/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">
                    Wed, June 21, 2021
                  </p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">16:00 - 20:00</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">UI/UX Conf</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 dark:bg-warning/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-warning h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">THU, May 11, 2021</p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">10:00 - 11:30</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Interview, Konnor Guzman</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-info/10 dark:bg-info/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-info h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Mon, Jul 16, 2021</p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">06:00 - 16:00</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Laravel Conf</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-warning/10 dark:bg-warning/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-warning h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="dark:text-navy-100 font-medium text-slate-600">Wed, Jun 16, 2021</p>
                  <div className="dark:text-navy-300 mt-1 flex text-xs text-slate-400">
                    <span className="shrink-0">15:30 - 11:30</span>
                    <div className="dark:bg-navy-500 mx-2 my-1 w-px bg-slate-200" />
                    <span className="line-clamp-1">Interview, Jonh Doe</span>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel
              id="notification-logs"
              className="tab-shift-left is-scrollbar-hidden overflow-y-auto px-4"
            >
              <div className="mt-8 pb-8 text-center">
                <img className="mx-auto w-36" src={noImages} alt="image" />
                <div className="mt-5">
                  <p className="dark:text-navy-100 text-base font-semibold text-slate-700">
                    No any logs
                  </p>
                  <p className="dark:text-navy-300 text-slate-400">There are no unread logs yet</p>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default NotificationsBox
