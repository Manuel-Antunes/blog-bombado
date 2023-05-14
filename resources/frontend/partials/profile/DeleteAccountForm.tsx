import React, { useState } from 'react'
import DeleteAccountFormModal from './DeleteAccountFormModal'

const DeleteAccountForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <div className="p-4 sm:p-5">
      <div className="flex flex-col items-center space-y-4 sm:flex-row sm:justify-between pb-5 sm:space-y-0">
        <div>
          <h3 className="text-base font-medium text-slate-600 dark:text-navy-100">Deletar Conta</h3>
          <p className="text-xs+ text-slate-400 dark:text-navy-300">
            Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos
            permanentemente. Antes de excluir sua conta, faça o download de todos os dados ou
            informações que deseja reter.
          </p>
        </div>
      </div>
      <div className="space-x-2 text-right">
        <button
          onClick={openModal}
          className="btn min-w-[7rem] rounded-full bg-danger font-medium text-white hover:bg-danger/80 focus:bg-danger/80 active:bg-danger/80 dark:bg-danger dark:hover:bg-danger/80 dark:focus:bg-danger/80 dark:active:bg-danger/80"
        >
          Deletar Conta
        </button>
      </div>
      <DeleteAccountFormModal open={isOpen} onClose={closeModal} />
    </div>
  )
}

export default DeleteAccountForm
