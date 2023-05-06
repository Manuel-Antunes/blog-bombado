import { Popover, Transition } from '@headlessui/react'
import React from 'react'

export interface ContactCardProps {
  contact: {
    id: number
    name: string
    email: string
    phone: string
    role: string
    avatar: string
    techs: string[]
  }
}

const ContactCard: React.FC<ContactCardProps> = ({ contact }) => {
  return (
    <div className="card" key={contact.id}>
      <div className="p-2 text-right">
        <div id="cardMenu1" className="inline-flex">
          <Popover>
            <Popover.Button className="btn dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </Popover.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel className="absolute">
                <div className="border-slate-150 font-inter dark:border-navy-500 dark:bg-navy-700 rounded-md border bg-white py-1.5">
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800"
                      >
                        Action
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800"
                      >
                        Another Action
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800"
                      >
                        Something else
                      </a>
                    </li>
                  </ul>
                  <div className="bg-slate-150 dark:bg-navy-500 my-1 h-px" />
                  <ul>
                    <li>
                      <a
                        href="#"
                        className="dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800"
                      >
                        Separated Link
                      </a>
                    </li>
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
      <div className="flex grow flex-col items-center px-4 pb-5 sm:px-5">
        <div className="avatar h-20 w-20">
          <img className="rounded-full" src={contact.avatar} alt="avatar" />
        </div>
        <h3 className="dark:text-navy-100 pt-3 text-lg font-medium text-slate-700">
          {contact.name}
        </h3>
        <p className="text-xs+">{contact.role}</p>
        <div className="inline-space mt-3 flex grow flex-wrap items-start">
          {contact.techs.map((tech) => (
            <a
              key={tech}
              href="#"
              className="tag bg-success/10 text-success hover:bg-success/20 focus:bg-success/20 active:bg-success/25 rounded-full"
            >
              {tech}
            </a>
          ))}
        </div>
        <div className="mt-6 grid w-full grid-cols-2 gap-2">
          <button className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 space-x-2 px-0 font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeWidth={2}
                d="M5 19.111c0-2.413 1.697-4.468 4.004-4.848l.208-.035a17.134 17.134 0 015.576 0l.208.035c2.307.38 4.004 2.435 4.004 4.848C19 20.154 18.181 21 17.172 21H6.828C5.818 21 5 20.154 5 19.111zM16.083 6.938c0 2.174-1.828 3.937-4.083 3.937S7.917 9.112 7.917 6.937C7.917 4.764 9.745 3 12 3s4.083 1.763 4.083 3.938z"
              />
            </svg>
            <span>Profile</span>
          </button>
          <button className="btn bg-slate-150 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90 space-x-2 px-0 font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span> Pay </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
