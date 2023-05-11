import { useForm } from 'react-hook-form'

import clsx from 'clsx'

import { If, Then } from 'react-if'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

type ForgotPasswordFormProps = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordForm: React.FC = () => {
  const { errors: serverSideErrors } = usePage().props

  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = useForm<ForgotPasswordFormProps>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  const [signInLoading, setSignInLoading] = useState(false)

  router.on('before', () => {
    setSignInLoading(true)
  })

  router.on('finish', () => {
    setSignInLoading(false)
  })

  const stardust = useStardust()

  const handleSubmitForm = async (data: ForgotPasswordFormProps) => {
    // signIn(data)
    router.post(stardust.route('password.email'), data as any)
  }

  return (
    <form className="mt-10" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
      <label className="relative flex">
        <input
          className={clsx(
            'form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring',
            {
              'border-error': errors.email,
            }
          )}
          placeholder="Email"
          type="email"
          {...register('email', { required: true })}
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </span>
      </label>
      {errors.email && (
        <span className="text-tiny+ text-error">{errors.email.message as string}</span>
      )}
      <button
        disabled={signInLoading}
        className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 mt-10 h-10 w-full space-x-2 font-medium text-white"
      >
        <If condition={signInLoading}>
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

export default ForgotPasswordForm
