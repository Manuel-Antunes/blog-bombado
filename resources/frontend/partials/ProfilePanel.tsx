import { Link, usePage } from '@inertiajs/react'
import React from 'react'
import { PageGlobalProps } from '../@types/page'
import { useStardust } from '../contexts/Stardust'

const ProfilePanel: React.FC = () => {
  const {
    props: {
      auth: { user },
    },
  } = usePage<PageGlobalProps>()

  const stardust = useStardust()

  return (
    <div className="popper-box border-slate-150 shadow-soft dark:border-navy-600 dark:bg-navy-700 w-64 rounded-lg border bg-white">
      <div className="dark:bg-navy-800 flex items-center space-x-4 rounded-t-lg bg-slate-100 py-5 px-4">
        <div className="avatar h-14 w-14">
          <img className="rounded-full" src={user.photo_url} alt="avatar" />
        </div>
        <div>
          <Link
            href={stardust.route('profile.edit')}
            className="hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light text-base font-medium text-slate-700"
          >
            {user.name}
          </Link>
        </div>
      </div>
      <div className="flex flex-col pt-2 pb-5">
        <Link
          href={stardust.route('profile.edit')}
          className="dark:hover:bg-navy-600 dark:focus:bg-navy-600 group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100"
        >
          <div className="bg-warning flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h2 className="group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light font-medium text-slate-700 transition-colors">
              Profile
            </h2>
            <div className="line-clamp-1 dark:text-navy-300 text-xs text-slate-400">
              Your profile setting
            </div>
          </div>
        </Link>
        <a
          href="#"
          className="dark:hover:bg-navy-600 dark:focus:bg-navy-600 group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100"
        >
          <div className="bg-info flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light font-medium text-slate-700 transition-colors">
              Messages
            </h2>
            <div className="line-clamp-1 dark:text-navy-300 text-xs text-slate-400">
              Your messages and tasks
            </div>
          </div>
        </a>
        <a
          href="#"
          className="dark:hover:bg-navy-600 dark:focus:bg-navy-600 group flex items-center space-x-3 py-2 px-4 tracking-wide outline-none transition-all hover:bg-slate-100 focus:bg-slate-100"
        >
          <div className="bg-error flex h-8 w-8 items-center justify-center rounded-lg text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="group-hover:text-primary group-focus:text-primary dark:text-navy-100 dark:group-hover:text-accent-light dark:group-focus:text-accent-light font-medium text-slate-700 transition-colors">
              Activity
            </h2>
            <div className="line-clamp-1 dark:text-navy-300 text-xs text-slate-400">
              Your activity and events
            </div>
          </div>
        </a>
        <div className="mt-3 px-4">
          <Link
            href={stardust.route('logout')}
            className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 h-9 w-full space-x-2 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfilePanel
