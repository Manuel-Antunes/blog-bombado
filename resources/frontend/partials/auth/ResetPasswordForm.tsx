import { useForm } from 'react-hook-form'

import { If, Then } from 'react-if'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

const resetPasswordSchema = z.object({
  password: z.string().min(8),
  password_confirmation: z.string(),
})

type ResetPasswordFormProps = z.infer<typeof resetPasswordSchema>

const ResetPasswordForm: React.FC = () => {
  const {
    errors: serverSideErrors,
    email,
    signedUrl,
  } = usePage<{ email: string; signedUrl: string }>().props

  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = useForm<ResetPasswordFormProps>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  const [operationLoading, setOperationLoading] = useState(false)

  router.on('before', () => {
    setOperationLoading(true)
  })

  router.on('finish', () => {
    setOperationLoading(false)
  })

  const stardust = useStardust()

  const handleSubmitForm = async (data: ResetPasswordFormProps) => {
    // signIn(data)
    router.post(signedUrl, {
      ...data,
      email,
    } as any)
  }

  return (
    <form className="mt-10" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
      <label className="relative flex">
        <input
          {...register('password')}
          className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
          placeholder="Password"
          type="password"
        />
        <span className="peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
      </label>
      <If condition={!!errors.password}>
        <Then>
          <span className="text-tiny+ text-error">{errors.password?.message}</span>
        </Then>
      </If>
      <label className="relative flex mt-5">
        <input
          {...register('password_confirmation')}
          className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
          placeholder="Repeat Password"
          type="password"
        />
        <span className="peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </span>
      </label>
      <If condition={!!errors.password_confirmation}>
        <Then>
          <span className="text-tiny+ text-error">{errors.password_confirmation?.message}</span>
        </Then>
      </If>
      <button
        disabled={operationLoading}
        className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 mt-10 h-10 w-full space-x-2 font-medium text-white"
      >
        <If condition={operationLoading}>
          <Then>
            <div className="spinner is-elastic border-primary/30 border-r-primary dark:border-accent/30 dark:border-r-accent h-7 w-7 animate-spin rounded-full border-[3px]"></div>
          </Then>
        </If>
        Reset Password
      </button>
      <div className="text-xs+ mt-4 text-center">
        <p className="line-clamp-1">
          <span>Don't need to reset your password ?</span>{' '}
          <Link
            href={stardust.route('login')}
            className="text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent transition-colors"
          >
            Back
          </Link>
        </p>
      </div>
    </form>
  )
}

export default ResetPasswordForm
