import { router } from '@inertiajs/react'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import _ from 'lodash'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Post } from '../../components/post/PostCard'
import MainLayout from '../../layouts/MainLayout'
import PostForm from '../../partials/post/PostForm'

interface EditPostFormData {
  title: string
  content: string
  category_id: number
  image: File | AttachmentContract | null
  description: string
}

const Edit: React.FC<{
  post: Partial<Post>
}> = ({ post }) => {
  const form = useForm<EditPostFormData>({
    defaultValues: {
      title: post.title,
      content: post.content,
      category_id: post.category?.id,
      image: post.image,
      description: post.description,
    },
  })

  const onSubmit = (data: EditPostFormData) => {
    // get an object with the difference between the original post and the new post
    const diff = _.omitBy(data, (value, key) => {
      return post[key as keyof Post] === value
    })

    router.put(`/posts/${post.id}`, {
      ...diff,
      image: data.image instanceof File ? data.image : undefined,
    } as any)
  }

  return (
    <MainLayout>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center justify-between space-y-4 py-5 sm:flex-row sm:space-y-0 lg:py-6">
            <div className="flex items-center space-x-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h2 className="text-xl font-medium text-slate-700 line-clamp-1 dark:text-navy-50">
                Update Post: {post.title}
              </h2>
            </div>
            <div className="flex justify-center space-x-2">
              <button className="btn min-w-[7rem] border border-slate-300 font-medium text-slate-700 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-100 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90">
                Preview
              </button>
              <button className="btn min-w-[7rem] bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">
                Save
              </button>
            </div>
          </div>
          <PostForm />
        </form>
      </FormProvider>
    </MainLayout>
  )
}

export default Edit
