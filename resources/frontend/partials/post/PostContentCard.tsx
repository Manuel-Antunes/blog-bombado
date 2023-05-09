import { Menu, Transition } from '@headlessui/react'
import { Link } from '@inertiajs/react'
import clsx from 'clsx'
import { DateTime } from 'luxon'
import React, { Fragment } from 'react'
import { Post } from '../../components/post/PostCard'
import { usePostActions } from '../../hooks/usePostActions'

const PostContentCard: React.FC<{
  post: Post
}> = ({ post }) => {
  const { postState, like } = usePostActions(post)
  return (
    <div className="card p-4 lg:p-6">
      {/* Author */}
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex">
              <div x-ref="popperRef" className="avatar h-12 w-12">
                <img className="mask is-squircle" src={post.user.photo_url} alt="avatar" />
              </div>
              <div
                x-ref="popperRoot"
                className="popper-root"
                style={{
                  position: 'fixed',
                  inset: '0px auto auto 0px',
                  margin: 0,
                  transform: 'translate(88px, 160px)',
                }}
                data-popper-placement="bottom"
              >
                <div className="popper-box">
                  <div className="flex w-48 flex-col items-center rounded-md border border-slate-150 bg-white p-3 text-center dark:border-navy-600 dark:bg-navy-700">
                    <div className="avatar h-16 w-16">
                      <img
                        className="rounded-full"
                        src="images/avatar/avatar-19.jpg"
                        alt="avatar"
                      />
                    </div>
                    <p className="mt-2 font-medium tracking-wide text-slate-700 dark:text-navy-100">
                      {post.user.name}
                    </p>
                    <a
                      href="#"
                      className="font-inter text-xs tracking-wide hover:text-primary focus:text-primary dark:hover:text-accent-light dark:focus:text-accent-light"
                    >
                      @travisfuller
                    </a>
                    <button className="btn mt-4 h-6 rounded-full bg-primary px-4 text-xs font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
                      Follow
                    </button>
                  </div>
                  <div
                    className="h-4 w-4"
                    data-popper-arrow=""
                    style={{
                      position: 'absolute',
                      left: 0,
                      transform: 'translate(88px, 0px)',
                    }}
                  >
                    <svg
                      viewBox="0 0 16 9"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute h-4 w-4"
                      fill="currentColor"
                    >
                      <path
                        className="text-slate-150 dark:text-navy-600"
                        d="M1.5 8.357s-.48.624 2.754-4.779C5.583 1.35 6.796.01 8 0c1.204-.009 2.417 1.33 3.76 3.578 3.253 5.43 2.74 4.78 2.74 4.78h-13z"
                      />
                      <path
                        className="text-white dark:text-navy-700"
                        d="M0 9s1.796-.017 4.67-4.648C5.853 2.442 6.93 1.293 8 1.286c1.07-.008 2.147 1.14 3.343 3.066C14.233 9.006 15.999 9 15.999 9H0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link
                href={`/users/${post.user.id}`}
                className="font-medium text-slate-700 line-clamp-1 hover:text-primary focus:text-primary dark:text-navy-100 dark:hover:text-accent-light dark:focus:text-accent-light"
              >
                {post.user.name}
              </Link>
              <div className="mt-1.5 flex items-center text-xs">
                <span className="line-clamp-1">
                  {DateTime.fromISO(post.created_at).toRelative()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="hidden sm:flex">
              <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
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
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <i className="fab fa-twitter text-base" />
              </button>
              <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <i className="fab fa-linkedin text-base" />
              </button>
              <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <i className="fab fa-instagram text-base" />
              </button>
              <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
                <i className="fab fa-facebook text-base" />
              </button>
            </div>
            <div className="inline-flex">
              <Menu as={'div'} className="z-40">
                <Menu.Button className="btn dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25 h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    ></path>
                  </svg>
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Menu.Items
                    as={'div'}
                    className="border-slate-150 font-inter dark:border-navy-500 dark:bg-navy-700 rounded-md border bg-white py-1.5 z-40 absolute"
                  >
                    <Menu.Item>
                      <Link
                        href={`/posts/${post.id}/edit`}
                        className="dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100 flex h-8 items-center space-x-3 px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800"
                      >
                        <span>Edit Post</span>
                      </Link>
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center space-x-3 sm:hidden">
          <button className="btn space-x-2 rounded-full border border-slate-300 px-4 text-xs+ font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4.5 w-4.5 text-slate-400 dark:text-navy-300"
              fill="none"
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
            <span> Save</span>
          </button>
          <div className="flex">
            <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <i className="fab fa-twitter text-base" />
            </button>
            <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <i className="fab fa-linkedin text-base" />
            </button>
            <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <i className="fab fa-instagram text-base" />
            </button>
            <button className="btn h-8 w-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
              <i className="fab fa-facebook text-base" />
            </button>
          </div>
        </div>
      </div>
      {/* Blog Post */}
      <div className="mt-6 font-inter text-base text-slate-600 dark:text-navy-200">
        <h1 className="text-xl font-medium text-slate-900 dark:text-navy-50 lg:text-2xl">
          {post.title}
        </h1>
        <h3 className="mt-1">{post.description}</h3>
        <img
          className="mt-5 h-80 w-full rounded-lg object-cover object-center"
          src={post.image?.url}
          alt="image"
        />
        <br />
        <div
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
      {/* Footer Blog Post */}
      <div className="mt-5 flex space-x-3">
        <button
          onClick={like}
          className="btn space-x-2 rounded-full border border-slate-300 px-4 text-xs+ font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
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
          <span> {postState.likes_count}</span>
        </button>
      </div>
    </div>
  )
}

export default PostContentCard
