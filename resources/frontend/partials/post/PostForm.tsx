import { Tab } from '@headlessui/react'
import { usePage } from '@inertiajs/react'
import clsx from 'clsx'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { If, Then } from 'react-if'
import ReactQuill from 'react-quill'
import Select from 'react-select'
import SelectCreatable from 'react-select/creatable'
import { PageGlobalProps } from '../../@types/page'
import { Category } from '../../components/post/PostCard'
import DropzoneInput from '../../components/shared/form/DropzoneInput'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'
interface PostFormData {
  title: string
  description: string
  category_id: number
  image: File
  content: string
  tags: string[]
}

const PostForm: React.FC = () => {
  const {
    register,
    formState: { errors: clientSideErrors },
    control,
  } = useFormContext<PostFormData>()

  const {
    props: { errors: serverSideErrors, categories = [] },
  } = usePage<
    PageGlobalProps & {
      categories: Category[]
    }
  >()

  const mappedCategories = useMemo(
    () =>
      categories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    [categories]
  )

  const errors = { ...clientSideErrors, ...getServerSideErrors(serverSideErrors) }

  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
      <div className="col-span-12 lg:col-span-8">
        <div className="card">
          <Tab.Group as={'div'} className="tabs flex flex-col">
            <div className="is-scrollbar-hidden overflow-x-auto">
              <div className="border-b-2 border-slate-150 dark:border-navy-500">
                <Tab.List as={'div'} className="tabs-list -mb-0.5 flex">
                  <Tab>
                    {({ selected }) => (
                      <div
                        className={clsx(
                          'btn h-14 shrink-0 space-x-2 rounded-none border-b-2 px-4 font-medium sm:px-5',
                          {
                            'border-primary text-primary dark:border-accent dark:text-accent-light':
                              selected,
                            'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100':
                              !selected,
                          }
                        )}
                      >
                        <i className="fa-solid fa-layer-group text-base" />
                        <span>General</span>
                      </div>
                    )}
                  </Tab>
                  {/* <Tab>
          {({ selected }) => (
            <div
              className={clsx(
                'btn h-14 shrink-0 space-x-2 rounded-none border-b-2 px-4 font-medium sm:px-5',
                {
                  'border-primary text-primary dark:border-accent dark:text-accent-light':
                    selected,
                  'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100':
                    !selected,
                }
              )}
            >
              <i className="fa-solid fa-tags text-base" />
              <span>Meta Tags</span>
            </div>
          )}
        </Tab>
        <Tab>
          {({ selected }) => (
            <div
              className={clsx(
                'btn h-14 shrink-0 space-x-2 rounded-none border-b-2 px-4 font-medium sm:px-5',
                {
                  'border-primary text-primary dark:border-accent dark:text-accent-light':
                    selected,
                  'border-transparent hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100':
                    !selected,
                }
              )}
            >
              <i className="fa-solid fa-bars-staggered text-base" />
              <span> Keywords </span>
            </div>
          )}
        </Tab> */}
                </Tab.List>
              </div>
            </div>
            <Tab.Panels as="div" className="tab-content !block p-4 sm:p-5">
              <Tab.Panel as="div" className="space-y-5">
                <label className="block">
                  <span className="font-medium text-slate-600 dark:text-navy-100">Title</span>
                  <input
                    className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Enter post title"
                    type="text"
                    {...register('title', { required: true })}
                  />
                </label>
                <If condition={!!errors.title}>
                  <Then>
                    <span className="text-tiny+ text-error">{errors.title?.message}</span>
                  </Then>
                </If>
                <label className="block">
                  <span className="font-medium text-slate-600 dark:text-navy-100">Description</span>
                  <input
                    className="form-input mt-1.5 w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                    placeholder="Enter post description"
                    type="text"
                    {...register('description', { required: true })}
                  />
                </label>
                <If condition={!!errors.description}>
                  <Then>
                    <span className="text-tiny+ text-error">{errors.description?.message}</span>
                  </Then>
                </If>
                <div>
                  <span className="font-medium text-slate-600 dark:text-navy-100">
                    Post Content
                  </span>
                  <div className="mt-1.5 w-full">
                    <Controller
                      control={control}
                      name="content"
                      render={({ field }) => (
                        <ReactQuill
                          modules={{
                            toolbar: [
                              ['bold', 'italic', 'underline', 'strike'],
                              ['blockquote', 'code-block'],
                              [{ header: 1 }, { header: 2 }],
                              [{ list: 'ordered' }, { list: 'bullet' }],
                              [{ script: 'sub' }, { script: 'super' }],
                              [{ indent: '-1' }, { indent: '+1' }],
                              [{ direction: 'rtl' }],
                              [{ size: ['small', false, 'large', 'huge'] }],
                              [{ header: [1, 2, 3, 4, 5, 6, false] }],
                              [{ color: [] }, { background: [] }],
                              [{ font: [] }],
                              [{ align: [] }],
                              ['clean'], // remove formatting button
                            ],
                          }}
                          placeholder="Enter your content..."
                          theme="snow"
                          {...field}
                        />
                      )}
                    />
                    <If condition={!!errors.content}>
                      <Then>
                        <span className="text-tiny+ text-error">{errors.content?.message}</span>
                      </Then>
                    </If>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-slate-600 dark:text-navy-100">Post Images</span>
                  <div className="mt-3">
                    <Controller
                      control={control}
                      render={({ field }) => (
                        <DropzoneInput
                          name={field.name}
                          className="h-56"
                          value={field.value}
                          accept=".jpg, .jpeg, .png"
                          onChange={(ev) =>
                            field.onChange(
                              (ev.target as any)?.files && (ev.target as any)?.files[0]
                            )
                          }
                        />
                      )}
                      name="image"
                    />
                    <If condition={!!errors.image}>
                      <Then>
                        <span className="text-tiny+ text-error">{errors.image?.message}</span>
                      </Then>
                    </If>
                  </div>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div className="card space-y-5 p-4 sm:p-5">
          <label className="block">
            <span className="font-medium text-slate-600 dark:text-navy-100">Category</span>
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => {
                return (
                  <Select
                    className="react-select-container mt-1.5 w-full"
                    classNamePrefix="react-select"
                    options={mappedCategories}
                    value={mappedCategories.find((c) => c.value === field.value)}
                    onChange={(value) => field.onChange(value?.value)}
                  />
                )
              }}
            />
          </label>
          <If condition={!!errors.category_id}>
            <Then>
              <span className="text-tiny+ text-error">{errors.category_id?.message}</span>
            </Then>
          </If>
          <label className="block">
            <span className="font-medium text-slate-600 dark:text-navy-100">Tags</span>
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => {
                return (
                  <SelectCreatable
                    isMulti
                    className="react-select-container mt-1.5 w-full"
                    classNamePrefix="react-select"
                    options={mappedCategories}
                  />
                )
              }}
            />
          </label>
          <If condition={!!errors.category_id}>
            <Then>
              <span className="text-tiny+ text-error">{errors.category_id?.message}</span>
            </Then>
          </If>
        </div>
      </div>
    </div>
  )
}

export default PostForm
