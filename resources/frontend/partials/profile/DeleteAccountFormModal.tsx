import { Dialog, DialogProps, Transition } from '@headlessui/react'
import { router, usePage } from '@inertiajs/react'
import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { PageGlobalProps } from '../../@types/page'
import FormControl from '../../components/shared/form/FormControl'
import TextField from '../../components/shared/form/TextField'
import { useStardust } from '../../contexts/Stardust'
import { getServerSideErrors } from '../../helpers/getServerSideErrors'

export interface DeleteAccountFormModalProps extends Omit<DialogProps<any>, 'onClose'> {
  onClose: () => void
}

type FormData = {
  password: string
}

const DeleteAccountFormModal: React.FC<DeleteAccountFormModalProps> = ({ onClose, open }) => {
  const {
    props: { errors: serverSideErrors, auth },
  } = usePage<PageGlobalProps>()

  const {
    register,
    handleSubmit,
    formState: { errors: clientSideErrors, touchedFields },
  } = useForm<FormData>()

  const errors = { ...getServerSideErrors(serverSideErrors), ...clientSideErrors }

  const stardust = useStardust()

  const onSubmit = (data: FormData) => {
    router.post(stardust.route('profile.destroy'), data as any)
  }

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-900/60 transition-opacity duration-300" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel
            as="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative flex w-full max-w-lg origin-top flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 dark:bg-navy-700"
          >
            <div className="flex justify-between rounded-t-lg bg-slate-200 px-4 py-3 dark:bg-navy-800 sm:px-5">
              <Dialog.Title className="text-base font-medium text-slate-700 dark:text-navy-100">
                Tem certeza de que deseja excluir sua conta?
              </Dialog.Title>
              <button
                type="button"
                onClick={onClose}
                className="btn -mr-1.5 h-7 w-7 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col overflow-y-auto px-4 py-4 sm:px-5">
              <p className="text-slate-600 dark:text-slate-400">
                Depois que sua conta for excluída, todos os seus recursos e dados serão inativados e
                não listados no sistema.{' '}
                {auth.user.has_password
                  ? 'Digite sua senha para confirmar que deseja excluir permanentemente sua conta.'
                  : ''}
              </p>
              <div className="mt-4 space-y-4">
                {auth.user.has_password && (
                  <label className="block">
                    <FormControl
                      label="Senha Atual"
                      helperText={touchedFields.password && errors.password?.message}
                      error={touchedFields.password && Boolean(errors.password)}
                      className="relative flex"
                    >
                      <TextField
                        className="form-input bg-slate-150 ring-primary/50 dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900 peer w-full rounded-lg py-2 placeholder:text-slate-400 hover:bg-slate-200 focus:ring"
                        placeholder="Insira a sua senha atual"
                        type="password"
                        autoComplete="password"
                        {...register('password')}
                      />
                    </FormControl>
                  </label>
                )}
                <div className="space-x-2 text-right">
                  <button
                    type="button"
                    onClick={onClose}
                    className="btn min-w-[7rem] rounded-full border border-slate-300 font-medium text-slate-800 hover:bg-slate-150 focus:bg-slate-150 active:bg-slate-150/80 dark:border-navy-450 dark:text-navy-50 dark:hover:bg-navy-500 dark:focus:bg-navy-500 dark:active:bg-navy-500/90"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn min-w-[7rem] rounded-full bg-danger font-medium text-white hover:bg-danger/80 focus:bg-danger/80 active:bg-danger/80 dark:bg-danger dark:hover:bg-danger/80 dark:focus:bg-danger/80 dark:active:bg-danger/80"
                  >
                    Deletar Conta
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default DeleteAccountFormModal
