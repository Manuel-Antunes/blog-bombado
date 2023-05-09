import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { If, Then } from 'react-if'

import { Link, router, usePage } from '@inertiajs/react'
import React, { useState } from 'react'
import { toast } from 'resources/frontend/services/toast'
import { getServerSideErrors } from '../../../helpers/getServerSideErrors'

const signUpSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string(),
    terms: z.literal(true),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['password_confirmation'],
      })
    }
  })

type RegisterFormProps = z.infer<typeof signUpSchema>

const RegisterForm: React.FC = () => {
  const handleSubmitForm = (data: RegisterFormProps) => {
    try {
      router.post('register', data as any)
    } catch (error) {
      toast.error('Failed to Sign Up.')
    }
  }

  const [inFlight, setInFlight] = useState(false)

  router.on('before', () => {
    setInFlight(true)
  })

  router.on('finish', () => {
    setInFlight(false)
  })

  const { errors: serverSideErrors } = usePage().props

  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors },
  } = useForm<RegisterFormProps & { password_confirmation: string; terms: boolean }>({
    resolver: zodResolver(signUpSchema),
  })

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  return (
    <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="mt-10 flex space-x-4">
        <a
          href="/google/redirect"
          type="button"
          className="btn hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90 w-full space-x-3 border border-slate-300 font-medium text-slate-800"
        >
          <i className="fa-brands fa-google"></i>
          <span>Google</span>
        </a>
        <a
          href="/facebook/redirect"
          type="button"
          className="btn hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90 w-full space-x-3 border border-slate-300 font-medium text-slate-800"
        >
          <i className="fa-brands fa-facebook"></i>
          <span>Facebook</span>
        </a>
      </div>
      <div className="my-7 flex items-center space-x-3">
        <div className="dark:bg-navy-500 h-px flex-1 bg-slate-200" />
        <p className="text-tiny+ uppercase">or sign up with email</p>
        <div className="dark:bg-navy-500 h-px flex-1 bg-slate-200" />
      </div>
      <div className="mt-4 space-y-4">
        <label className="relative flex">
          <input
            {...register('name')}
            className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
            placeholder="Username"
            type="text"
          />
          <span className="peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-colors duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </span>
        </label>
        <If condition={!!errors.name}>
          <Then>
            <span className="text-tiny+ text-error">{errors.name?.message}</span>
          </Then>
        </If>
        <label className="relative flex">
          <input
            {...register('email')}
            className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
            placeholder="Email"
            type="email"
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
        <If condition={!!errors.email}>
          <Then>
            <span className="text-tiny+ text-error">{errors.email?.message}</span>
          </Then>
        </If>
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
        <label className="relative flex">
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
        <div className="mt-4 flex items-center space-x-2">
          <input
            {...register('terms')}
            className="form-checkbox is-basic checked:border-primary checked:bg-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent h-5 w-5 rounded border-slate-400/70"
            type="checkbox"
          />
          <p className="line-clamp-1">
            I agree with{' '}
            <a href="#" className="dark:text-navy-300 text-slate-400 hover:underline">
              privacy policy
            </a>
          </p>
        </div>
        <If condition={!!errors.terms}>
          <Then>
            <span className="text-tiny+ text-error">{errors.terms?.message}</span>
          </Then>
        </If>
      </div>
      <button
        disabled={inFlight}
        className="btn bg-primary hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90 mt-10 h-10 w-full font-medium text-white"
      >
        Sign Up
      </button>
      <div className="text-xs+ mt-4 text-center">
        <p className="line-clamp-1">
          <span>Already have an account? </span>
          <Link
            href="/login"
            className="text-primary hover:text-primary-focus dark:text-accent-light dark:hover:text-accent transition-colors"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
