import { Link } from '@inertiajs/react'
import { DateTime } from 'luxon'
import React from 'react'
import { useStardust } from '../../contexts/Stardust'
import { usePostActions } from '../../hooks/usePostActions'
import { Post } from './PostCard'

interface PostSlateProps {
  post: Post
}

const PostShySlate: React.FC<PostSlateProps> = ({ post }) => {
  const stardust = useStardust()
  const { save, postState } = usePostActions(post)

  return (
    <div className="flex justify-between space-x-2">
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-xs font-medium line-clamp-1">
            {DateTime.fromISO(post.created_at).toRelative()}
          </p>
          <div className="mt-1 text-slate-800 line-clamp-3 dark:text-navy-100">
            <Link
              href={stardust.route('posts.show', {
                id: post.id,
              })}
              className="font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
            >
              {post.title.length > 50 ? post.title.slice(0, 50) + '...' : post.title}
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              onClick={save}
              className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill={postState.saved ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <img
        src={
          post.image?.url ||
          'https://images.unsplash.com/photo-1621574539077-4b7b3e7b0b0f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cG9zdCUyMGltYWdlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1'
        }
        className="h-24 w-24 rounded-lg object-cover object-center"
        alt="image"
      />
    </div>
  )
}

export default PostShySlate
