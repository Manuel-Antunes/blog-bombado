import { useForm } from 'react-hook-form'

import clsx from 'clsx'

import { If, Then } from 'react-if'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  rememberMe: z.boolean(),
})

type LoginFormProps = z.infer<typeof loginSchema>

const LoginForm: React.FC = () => {
  const { errors: serverSideErrors } = usePage().props

  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = useForm<LoginFormProps>({
    resolver: zodResolver(loginSchema),
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

  const handleSubmitForm = async (data: LoginFormProps) => {
    // signIn(data)
    router.post(stardust.route('login'), data as any)
  }

  return (
    <form className="mt-16" noValidate onSubmit={handleSubmit(handleSubmitForm)}>
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
      <label className="relative mt-4 flex">
        <input
          className={clsx(
            'form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring',
            {
              'border-error': errors.password,
            }
          )}
          placeholder="Password"
          type="password"
          {...register('password', { required: true })}
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
      {errors.password && <span className="text-tiny+ text-error">{errors.password.message}</span>}
      <div className="mt-4 flex items-center justify-between space-x-2">
        <label className="inline-flex items-center space-x-2">
          <input
            className={clsx(
              'form-checkbox is-outline before:bg-primary checked:border-primary hover:border-primary focus:border-primary dark:border-navy-500 dark:bg-navy-900 dark:before:bg-accent dark:checked:border-accent dark:hover:border-accent dark:focus:border-accent h-5 w-5 rounded border-slate-400/70 bg-slate-100'
            )}
            type="checkbox"
            {...register('rememberMe')}
          />
          <span className="line-clamp-1">Remember me</span>
        </label>
        <Link
          href={stardust.route('password.request')}
          className="line-clamp-1 dark:text-navy-300 dark:hover:text-navy-100 dark:focus:text-navy-100 text-xs text-slate-400 transition-colors hover:text-slate-800 focus:text-slate-800"
        >
          Forgot Password?
        </Link>
      </div>
      <button
        disabled={signInLoading}
        className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 mt-10 h-10 w-full space-x-2 font-medium text-white"
      >
        <If condition={signInLoading}>
          <Then>
            <div className="spinner is-elastic border-primary/30 border-r-primary dark:border-accent/30 dark:border-r-accent h-7 w-7 animate-spin rounded-full border-[3px]"></div>
          </Then>
        </If>
        Sign In
      </button>
      <div className="text-xs+ mt-4 text-center">
        <p className="line-clamp-1">
          <span>Dont have Account?</span>{' '}
          <Link
            href={stardust.route('register')}
            className="text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent transition-colors"
          >
            Create account
          </Link>
        </p>
      </div>
      <div className="my-7 flex items-center space-x-3">
        <div className="dark:bg-navy-500 h-px flex-1 bg-slate-200" />
        <p>OR</p>
        <div className="dark:bg-navy-500 h-px flex-1 bg-slate-200" />
      </div>
      <div className="flex space-x-4">
        <a
          href="/google/redirect"
          type="button"
          className="btn hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90 w-full space-x-3 border border-slate-300 font-medium text-slate-800"
        >
          <i className="fa-brands fa-google"></i>
          <span>Google</span>
        </a>
        <a
          href="/google/facebook"
          type="button"
          className="btn hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90 w-full space-x-3 border border-slate-300 font-medium text-slate-800"
        >
          <i className="fa-brands fa-facebook"></i>
          <span>Facebook</span>
        </a>
      </div>
    </form>
  )
}

export default LoginForm
