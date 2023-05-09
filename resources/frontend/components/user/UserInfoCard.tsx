import React from 'react'
import { User } from '../post/PostCard'

interface UserInfoCardProps {
  user: User
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  return (
    <div className="card">
      <div className="h-24 rounded-t-lg bg-primary dark:bg-accent">
        {user.banner && (
          <img
            className="h-full w-full rounded-t-lg object-cover object-center"
            src={user.banner.url}
            alt="image"
          />
        )}
      </div>
      <div className="px-4 pt-2 pb-5 sm:px-5">
        <div className="avatar -mt-12 h-20 w-20">
          <img
            className="rounded-full border-2 border-white dark:border-navy-700"
            src={user.photo_url}
            alt="avatar"
          />
        </div>
        <h3 className="pt-2 text-lg font-medium text-slate-700 dark:text-navy-100">{user.name}</h3>
        <p className="text-xs+ text-slate-400 dark:text-navy-300">
          {user.followers_count} followers
        </p>
        <p className="mt-3">{user.bio}</p>
        <div className="mt-5 flex space-x-1">
          <button
            type="button"
            className="btn h-7 rounded-full bg-slate-150 px-3 text-xs+ font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
          >
            Follow
          </button>
          <button
            type="button"
            className="btn h-7 w-7 rounded-full bg-slate-150 px-0 text-xs+ font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
          >
            <i className="far fa-envelope" />
          </button>
          <button
            type="button"
            className="btn h-7 w-7 rounded-full bg-slate-150 px-0 text-xs+ font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
          >
            <i className="fa fa-ellipsis-h" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserInfoCard
