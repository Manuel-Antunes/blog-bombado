import { router, usePage } from '@inertiajs/react'
import { AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'
import _ from 'lodash'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { If, Then } from 'react-if'
import { PageGlobalProps } from '../../@types/page'
import { User } from '../../components/post/PostCard'
import AvatarInput from '../../components/shared/form/AvatarInput'
import DropzoneInput from '../../components/shared/form/DropzoneInput'
import FormControl from '../../components/shared/form/FormControl'
import TextField from '../../components/shared/form/TextField'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

type FormData = Partial<Omit<Omit<User, 'banner'>, 'avatar'>> & {
  banner: File | AttachmentContract | null
  avatar: File | AttachmentContract | string | null
}

const UpdateProfileForm: React.FC = () => {
  const {
    props: { auth, errors: serverSideErrors },
  } = usePage<PageGlobalProps>()

  const stardust = useStardust()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: clientSideErrors, touchedFields },
  } = useForm<FormData>({
    defaultValues: {
      name: auth.user.name,
      email: auth.user.email,
      bio: auth.user.bio,
      banner: auth.user.banner,
      avatar: auth.user.photo_url,
    },
  })

  const onSubmit = async (data: FormData) => {
    const diff = _.omitBy(data, (value, key) => {
      return auth.user[key as keyof User] === value
    })
    router.put(stardust.route('profile.update'), {
      ...diff,
      banner: data.banner instanceof File ? data.banner : undefined,
      avatar: data.avatar instanceof File ? data.avatar : undefined,
    } as any)
  }

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
          <span className="text-base font-medium text-slate-600 dark:text-navy-100">Avatar</span>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { onChange, value } }) => (
              <AvatarInput
                onChange={(ev) =>
                  onChange((ev.target as any)?.files && (ev.target as any)?.files[0])
                }
                value={value}
              />
            )}
          />
        </div>
        <div className="my-7 h-px bg-slate-200 dark:bg-navy-500"></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="col-span-2">
            <span className="font-medium text-slate-600 dark:text-navy-100">Banner</span>
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
                      field.onChange((ev.target as any)?.files && (ev.target as any)?.files[0])
                    }
                  />
                )}
                name="banner"
              />
              <If condition={!!errors.banner}>
                <Then>
                  <span className="text-tiny+ text-error">{errors.banner?.message}</span>
                </Then>
              </If>
            </div>
          </div>
          <div className="col-span-2">
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
          <div className="col-span-2">
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
          <div className="col-span-2">
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
      </div>
    </form>
  )
}

export default UpdateProfileForm
