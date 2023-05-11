import { Head, router } from '@inertiajs/react'
import _ from 'lodash'
import React from 'react'
import { useForm } from 'react-hook-form'
import { PageGlobalProps } from '../../@types/page'
import { User } from '../../components/post/PostCard'
import FormControl from '../../components/shared/form/FormControl'
import TextField from '../../components/shared/form/TextField'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'
import MainLayout from '../../layouts/MainLayout'
import ProfileNavigation from '../../partials/profile/ProfileNavigation'

type FormData = Partial<
  User & {
    password: string
    password_confirmation: string
  }
>

const Edit: React.FC<PageGlobalProps> = ({ auth, errors: serverSideErrors }) => {
  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors, touchedFields },
  } = useForm<FormData>({
    defaultValues: {
      name: auth.user.name,
      email: auth.user.email,
      bio: auth.user.bio,
    },
  })

  const onSubmit = async (data: FormData) => {
    const diff = _.omitBy(data, (value, key) => {
      return auth.user[key as keyof User] === value
    })
    router.put('/profile', diff as any)
  }

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  return (
    <MainLayout>
      <Head title="Profile" />
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full">
          <ProfileNavigation />
          <div className="col-span-12 lg:col-span-8">
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="card">
              <div className="flex flex-col items-center space-y-4 border-b border-slate-200 p-4 dark:border-navy-500 sm:flex-row sm:justify-between sm:space-y-0 sm:px-5">
                <h2 className="text-lg font-medium tracking-wide text-slate-700 dark:text-navy-100">
                  Meu Perfil
                </h2>
                <div className="flex justify-center space-x-2">
                  <button
                    type="submit"
                    className="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
                  >
                    Salvar
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-base font-medium text-slate-600 dark:text-navy-100">
                    Avatar
                  </span>
                  <div className="avatar mt-1.5 h-20 w-20">
                    <img className="mask is-squircle" src={auth.user.photo_url} alt="avatar" />
                    <div className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-white dark:bg-navy-700">
                      <a
                        target="_blank"
                        href="https://pt.gravatar.com/emails/"
                        className="btn h-6 w-6 rounded-full border border-slate-200 p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:border-navy-500 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
                        rel="noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="my-7 h-px bg-slate-200 dark:bg-navy-500"></div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="col-span-1 md:col-span-2">
                    <FormControl
                      helperText={touchedFields.name && errors.name?.message}
                      error={touchedFields.name && Boolean(errors.name)}
                      className="relative flex"
                      label="Nome em Exibição"
                    >
                      <TextField
                        placeholder="Insira o nome"
                        type="text"
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
                        {...register('name')}
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <i className="fa-regular fa-user text-base"></i>
                      </span>
                    </FormControl>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <FormControl
                      helperText={touchedFields.bio && errors.bio?.message}
                      error={touchedFields.bio && Boolean(errors.bio)}
                      className="relative flex"
                      label="Bio"
                    >
                      <textarea
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring !p-3"
                        placeholder="Enter your bio"
                        {...register('bio')}
                      ></textarea>
                    </FormControl>
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <FormControl
                      label="Endereço de Email"
                      helperText={touchedFields.email && errors.email?.message}
                      error={touchedFields.email && Boolean(errors.email)}
                      className="relative flex"
                    >
                      <TextField
                        readOnly
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg px-3 py-2 pl-9 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
                        placeholder="Enter email address"
                        type="text"
                        autoComplete="email"
                        {...register('email')}
                      />
                      <span className="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                        <i className="fa-regular fa-envelope text-base"></i>
                      </span>
                    </FormControl>
                  </div>
                </div>
                <div className="my-7 h-px bg-slate-200 dark:bg-navy-500"></div>
                <div>
                  <h3 className="text-base font-medium text-slate-600 dark:text-navy-100">
                    Atualizar Senha
                  </h3>
                  <p className="text-xs+ text-slate-400 dark:text-navy-300">
                    Insira e confime sua nova senha.
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
                    <FormControl
                      label="Senha"
                      helperText={touchedFields.password && errors.password?.message}
                      error={touchedFields.password && Boolean(errors.password)}
                      className="relative flex"
                    >
                      <TextField
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg py-2 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
                        placeholder="Insira a nova senha"
                        type="password"
                        autoComplete="password"
                        {...register('password')}
                      />
                    </FormControl>
                    <FormControl
                      label="Confirmar Senha"
                      helperText={
                        touchedFields.password_confirmation && errors.password_confirmation?.message
                      }
                      error={
                        touchedFields.password_confirmation && Boolean(errors.password_confirmation)
                      }
                      className="relative flex"
                    >
                      <TextField
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg py-2 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
                        placeholder="Confirme sua senha"
                        type="password"
                        autoComplete="new-password"
                        {...register('password_confirmation')}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Edit
