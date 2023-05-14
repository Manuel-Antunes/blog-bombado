import { Tab } from '@headlessui/react'
import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'
import noImages from 'resources/frontend/assets/images/illustrations/empty-girl-box.svg'
import { PageGlobalProps } from '../@types/page'
import NotificationElement from '../components/partials/NotificationElement'

const NotificationsBox: React.FC = () => {
  const {
    props: {
      auth: { notifications },
    },
  } = usePage<PageGlobalProps>()

  const alertNotifications = notifications.filter(
    (notification) => notification.data.type === 'alert'
  )

  const eventsNotifications = notifications.filter(
    (notification) => notification.data.type === 'events'
  )

  const logsNotifications = notifications.filter(
    (notification) => notification.data.type === 'logs'
  )

  return (
    <div id="notification-box" className="absolute -right-18 z-50 md:right-0 top-12">
      <div className="notification-tab-wrapper popper-box border-slate-150 shadow-soft dark:border-navy-800 dark:bg-navy-700 dark:shadow-soft-dark mx-4 mt-1 flex max-h-[calc(100vh-6rem)] w-[calc(100vw-2rem)] flex-col rounded-lg border bg-white sm:m-0 sm:w-80">
        <Tab.Group>
          <div className="dark:bg-navy-800 dark:text-navy-200 rounded-t-lg bg-slate-100 text-slate-600">
            <div className="flex items-center justify-between px-4 pt-2">
              <div className="flex items-center space-x-2">
                <h3 className="dark:text-navy-100 font-medium text-slate-700">Notifications</h3>
                <div className="badge bg-primary/10 text-primary dark:bg-accent-light/15 dark:text-accent-light h-5 rounded-full px-1.5">
                  {notifications.length}
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
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4"
              id="notification-all"
            >
              {notifications.length === 0 ? (
                <div className="mt-8 pb-8 text-center">
                  <img className="mx-auto w-36" src={noImages} alt="image" />
                  <div className="mt-5">
                    <p className="dark:text-navy-100 text-base font-semibold text-slate-700">
                      No any events
                    </p>
                    <p className="dark:text-navy-300 text-slate-400">
                      There are no unread events yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {notifications.map((notification) => (
                    <NotificationElement key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel
              id="notification-alerts"
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4"
            >
              {alertNotifications.length === 0 ? (
                <div className="mt-8 pb-8 text-center">
                  <img className="mx-auto w-36" src={noImages} alt="image" />
                  <div className="mt-5">
                    <p className="dark:text-navy-100 text-base font-semibold text-slate-700">
                      No any alerts
                    </p>
                    <p className="dark:text-navy-300 text-slate-400">
                      There are no unread alerts yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {notifications.map((notification) => (
                    <NotificationElement key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel
              id="notification-events"
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4"
            >
              {eventsNotifications.length === 0 ? (
                <div className="mt-8 pb-8 text-center">
                  <img className="mx-auto w-36" src={noImages} alt="image" />
                  <div className="mt-5">
                    <p className="dark:text-navy-100 text-base font-semibold text-slate-700">
                      No any events
                    </p>
                    <p className="dark:text-navy-300 text-slate-400">
                      There are no unread events yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {notifications.map((notification) => (
                    <NotificationElement key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </Tab.Panel>
            <Tab.Panel
              id="notification-logs"
              className="tab-shift-left is-scrollbar-hidden space-y-4 overflow-y-auto px-4"
            >
              {logsNotifications.length === 0 ? (
                <div className="mt-8 pb-8 text-center">
                  <img className="mx-auto w-36" src={noImages} alt="image" />
                  <div className="mt-5">
                    <p className="dark:text-navy-100 text-base font-semibold text-slate-700">
                      No any logs
                    </p>
                    <p className="dark:text-navy-300 text-slate-400">
                      There are no unread logs yet
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-4 space-y-4">
                  {notifications.map((notification) => (
                    <NotificationElement key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  )
}

export default NotificationsBox
