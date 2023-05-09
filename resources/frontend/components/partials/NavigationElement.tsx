import { Link } from '@inertiajs/react'
import Tippy, { TippyProps } from '@tippyjs/react'
import { clsx } from 'clsx'
import React from 'react'
import { roundArrow } from 'tippy.js'
import { useStardust } from '../../contexts/Stardust'

export interface NavigationElementProps {
  children: React.ReactNode
  title: string
  href: string
  name: string
}

const tippyConfig: TippyProps = {
  arrow: roundArrow,
  animation: 'shift-away',
  zIndex: 10003,
  placement: 'right',
}

const NavigationElement: React.FC<NavigationElementProps> = ({ title, children, name }) => {
  const stardust = useStardust()
  return (
    <Tippy content={title} {...tippyConfig} className="tippy-box">
      <Link
        href={stardust.route(name)}
        className={clsx('', {
          'flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:bg-navy-600 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90':
            stardust.isCurrent(name),
          'flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200 hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25':
            !stardust.isCurrent(name),
        })}
      >
        {children}
      </Link>
    </Tippy>
  )
}

export default NavigationElement
