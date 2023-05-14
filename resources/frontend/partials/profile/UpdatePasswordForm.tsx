import { router, usePage } from '@inertiajs/react'
import React from 'react'
import { useForm } from 'react-hook-form'
import FormControl from '../../components/shared/form/FormControl'
import TextField from '../../components/shared/form/TextField'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

interface FormData {
  current_password: string
  password: string
  password_confirmation: string
}

const UpdatePasswordForm: React.FC = () => {
  const {
    props: { errors: serverSideErrors },
  } = usePage()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: clientSideErrors, touchedFields },
  } = useForm<FormData>()

  const stardust = useStardust()

  const onSubmit = async (data: FormData) => {
    reset()
    router.put(stardust.route('password.update'), data as any)
  }

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-5">
      <div className="flex flex-col items-center space-y-4 border-b border-slate-200 dark:border-navy-500 sm:flex-row sm:justify-between pb-5 sm:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-base font-medium text-slate-600 dark:text-navy-100">
            Atualizar Senha
          </h3>
          <p className="text-xs+ text-slate-400 dark:text-navy-300">
            Insira e confime sua nova senha.
          </p>
        </div>
        <div className="flex justify-center space-x-2">
          <button
            type="submit"
            className="btn min-w-[7rem] rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
          >
            Salvar
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-6">
        <div className="col-span-1 sm:col-span-2">
          <FormControl
            label="Senha Atual"
            helperText={touchedFields.current_password && errors.current_password?.message}
            error={touchedFields.current_password && Boolean(errors.current_password)}
            className="relative flex"
          >
            <TextField
              className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg py-2 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
              placeholder="Insira a sua senha atual"
              type="password"
              autoComplete="password"
              {...register('current_password')}
            />
          </FormControl>
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FormControl
            label="Nova Senha"
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
        </div>
        <div className="col-span-1 sm:col-span-2">
          <FormControl
            label="Confirmar Senha"
            helperText={
              touchedFields.password_confirmation && errors.password_confirmation?.message
            }
            error={touchedFields.password_confirmation && Boolean(errors.password_confirmation)}
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
    </form>
  )
}

export default UpdatePasswordForm
