import React from 'react'
import { Notification } from '../../@types/page'

const NotificationElement: React.FC<{
  notification: Notification
}> = ({ notification }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="bg-secondary/10 dark:bg-secondary-light/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        <i className="fa fa-user-edit text-secondary dark:text-secondary-light" />
      </div>
      <div>
        <p className="dark:text-navy-100 font-medium text-slate-600">{notification.data.subject}</p>
        <div className="line-clamp-1 dark:text-navy-300 mt-1 text-xs text-slate-400">
          {notification.data.message}
        </div>
      </div>
    </div>
  )
}

export default NotificationElement
