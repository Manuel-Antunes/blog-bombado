import { Link } from '@inertiajs/react'
import { DateTime } from 'luxon'
import React from 'react'
import { useStardust } from '../../contexts/Stardust'
import { Post } from './PostCard'

interface PostSlateProps {
  post: Post
}

const PostSlate: React.FC<PostSlateProps> = ({ post }) => {
  const stardust = useStardust()

  return (
    <div className="card lg:flex-row overflow-hidden">
      <img
        className="h-48 bg-navy-400 dark:bg-navy-600 w-full shrink-0 rounded-t-lg bg-cover bg-center object-cover object-center lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l-lg"
        src={post.image?.url || 'https://dummyimage.com/720x400'}
        alt="image"
      />
      <div className="flex w-full grow flex-col px-4 py-3 sm:px-5">
        <div className="flex items-center justify-between">
          <a className="text-xs+ text-info" href="#">
            {post.category.name}
          </a>
          <div className="-mr-1.5 flex space-x-1">
            <button className="btn h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div>
          <Link
            href={stardust.route('posts.show', {
              id: post.id,
            })}
            className="text-lg font-medium text-slate-700 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
          >
            {post.title}
          </Link>
        </div>
        <p className="mt-1 line-clamp-3">{post.description}</p>
        <div className="grow">
          <div className="mt-2 flex items-center text-xs">
            <Link
              href={stardust.route('users.show', {
                id: post.user.id,
              })}
              className="flex items-center space-x-2 hover:text-slate-800 dark:hover:text-navy-100"
            >
              <div className="avatar h-6 w-6">
                <img className="rounded-full" src={post.user.photo_url} alt="avatar" />
              </div>
              <span className="line-clamp-1">{post.user.name}</span>
            </Link>
            <div className="mx-3 my-1 w-px self-stretch bg-slate-200 dark:bg-navy-500" />
            <span className="shrink-0 text-slate-400 dark:text-navy-300">
              {DateTime.fromISO(post.created_at).toRelative()}
            </span>
          </div>
        </div>
        <div className="mt-1 flex justify-end">
          <Link
            href={stardust.route('posts.show', {
              id: post.id,
            })}
            className="btn px-2.5 py-1.5 font-medium text-primary hover:bg-primary/20 focus:bg-primary/20 active:bg-primary/25 dark:text-accent-light dark:hover:bg-accent-light/20 dark:focus:bg-accent-light/20 dark:active:bg-accent-light/25"
          >
            READ ARTICLE
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PostSlate
