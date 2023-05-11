import { Link, usePage } from '@inertiajs/react'
import clsx from 'clsx'
import React from 'react'
import { PageGlobalProps } from '../../@types/page'
import { profileNavigationElements } from '../../constants/navigation'
import { useStardust } from '../../contexts/Stardust'

const ProfileNavigation: React.FC = () => {
  const {
    props: { auth },
  } = usePage<PageGlobalProps>()

  const stardust = useStardust()

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="card p-4 sm:p-5">
        <div className="flex items-center space-x-4">
          <div className="avatar h-14 w-14">
            <img className="rounded-full" src={auth.user.photo_url} alt="avatar" />
          </div>
          <div>
            <h3 className="text-base font-medium text-slate-700 dark:text-navy-100">
              {auth.user?.name}
            </h3>
          </div>
        </div>
        <ul className="mt-6 space-y-1.5 font-inter font-medium">
          {profileNavigationElements.map((element, index) => (
            <li key={element.name}>
              <Link
                className={clsx(
                  'flex items-center space-x-2 rounded-lg px-4 py-2.5 tracking-wide outline-none transition-all',
                  {
                    'group flex space-x-2 rounded-lg hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100':
                      !stardust.isCurrent(element.name),
                    'text-white bg-primary': stardust.isCurrent(element.name),
                  }
                )}
                href={stardust.route(element.name)}
              >
                {element.children}
                <span>{element.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ProfileNavigation
