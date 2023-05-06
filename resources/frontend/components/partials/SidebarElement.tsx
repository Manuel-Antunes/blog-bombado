import { Link } from '@inertiajs/react'
import Tippy, { TippyProps } from '@tippyjs/react'
import { clsx } from 'clsx'
import { roundArrow } from 'tippy.js'

export interface SidebarElementProps {
  children: React.ReactNode
  title: string
  href: string
}

const tippyConfig: TippyProps = {
  arrow: roundArrow,
  animation: 'shift-away',
  zIndex: 10003,
  placement: 'right',
}

const SidebarElement: React.FC<SidebarElementProps> = ({ title, children, href }) => {
  return (
    <Tippy content={title} {...tippyConfig} className="tippy-box">
      <Link
        href={href}
        className={clsx(
          'tooltip-main-sidebar hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 flex h-11 w-11 items-center justify-center rounded-lg outline-none transition-colors duration-200'
        )}
      >
        {children}
      </Link>
    </Tippy>
  )
}

export default SidebarElement
