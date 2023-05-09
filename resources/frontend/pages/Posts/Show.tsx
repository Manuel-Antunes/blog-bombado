import React from 'react'
import { Post } from '../../components/post/PostCard'
import PostShySlate from '../../components/post/PostShySlate'
import PostSlate from '../../components/post/PostSlate'
import UserInfoCard from '../../components/user/UserInfoCard'
import MainLayout from '../../layouts/MainLayout'
import PostContentCard from '../../partials/post/PostContentCard'

const Show: React.FC<{
  post: Post
  recentPosts: Post[]
  recentPostsFromAuthor: Post[]
}> = ({ post, recentPosts, recentPostsFromAuthor }) => {
  return (
    <MainLayout>
      <div className="grid grid-cols-12 lg:gap-6">
        <div className="col-span-12 pt-6 lg:col-span-8 lg:pb-6">
          <PostContentCard post={post} />
          <div className="mt-5">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium text-slate-800 dark:text-navy-100">
                Recent Articles
              </p>
              {recentPosts.length ? (
                <a
                  href="#"
                  className="border-b border-dotted border-current pb-0.5 text-xs+ font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70"
                >
                  View All
                </a>
              ) : undefined}
            </div>
            <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-1 lg:gap-6">
              {recentPosts.length ? (
                recentPosts.map((post) => <PostSlate key={post.id} post={post} />)
              ) : (
                <div className="flex justify-center items-center">
                  <span className="text-lg font-medium text-slate-800 dark:text-navy-100">
                    No Recent Posts Found
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 py-6 lg:sticky lg:bottom-0 lg:col-span-4 lg:self-end">
          <UserInfoCard user={post.user} />
          <div className="mt-5">
            <p className="border-b border-slate-200 pb-2 text-base text-slate-800 dark:border-navy-600 dark:text-navy-100">
              More from {post.user.name}
            </p>
            <div className="mt-3 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
              {recentPostsFromAuthor.map((post) => (
                <PostShySlate key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Show
