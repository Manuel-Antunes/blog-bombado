import { Link } from '@inertiajs/react'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import clsx from 'clsx'
import { DateTime } from 'luxon'
import React, { useMemo } from 'react'
import { useStardust } from '../../contexts/Stardust'
import { usePostActions } from '../../hooks/usePostActions'

export interface Category {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

export interface User {
  id: number
  name: string
  bio?: string
  admin: boolean
  email: string
  avatar?: AttachmentContract
  banner?: AttachmentContract
  photo_url?: string
  followers_count: number
  following_count: number
  likes_count: number
  created_at: string
  updated_at: string
  remember_me_token: string
}

export interface Post {
  id: number
  title: string
  description: string
  category: Category
  image?: AttachmentContract
  content: string
  created_at: string
  updated_at: string
  likes_count: number
  liked?: boolean
  user: User
}

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { postState, like } = usePostActions(post)

  const formattedCreatedAt = useMemo(() => {
    return DateTime.fromISO(postState.created_at).toRelative()
  }, [postState])

  const stardust = useStardust()

  return (
    <div className="card">
      <img
        src={postState.image?.url}
        className="h-48 w-full rounded-t-lg object-cover object-center"
        alt="images"
      />
      <div className="flex grow flex-col p-4">
        <div className="flex">
          <Link
            href={stardust.route('categories.show', {
              id: postState.category.slug,
            })}
            className="text-xs text-info line-clamp-1"
          >
            {postState.category.name}
          </Link>
          <div className="mx-2 my-0.5 w-px bg-slate-200 dark:bg-navy-500"></div>

          <span className="text-tiny+ text-slate-400 dark:text-navy-300">{formattedCreatedAt}</span>
        </div>

        <div className="pt-2 line-clamp-2">
          <Link
            href={stardust.route('posts.show', {
              id: postState.id,
            })}
            className="text-base font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
          >
            {postState.title}
          </Link>
        </div>

        <p className="grow pt-2">{postState.description}</p>

        <div className="mt-3 text-right">
          <button
            onClick={like}
            className="btn h-8 space-x-1.5 rounded-full bg-slate-150 px-3 text-xs+ font-medium text-slate-800 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200/80 dark:bg-navy-500 dark:text-navy-50 dark:hover:bg-navy-450 dark:focus:bg-navy-450 dark:active:bg-navy-450/90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={clsx('h-4.5 w-4.5', {
                'text-primary': postState.liked,
                'text-slate-400 dark:text-navy-300': !postState.liked,
              })}
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span> {postState.likes_count} </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
