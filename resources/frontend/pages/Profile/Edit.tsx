import { Head } from '@inertiajs/react'
import React from 'react'
import { PageGlobalProps } from '../../@types/page'
import MainLayout from '../../layouts/MainLayout'
import DeleteAccountForm from '../../partials/profile/DeleteAccountForm'
import ProfileNavigation from '../../partials/profile/ProfileNavigation'
import UpdatePasswordForm from '../../partials/profile/UpdatePasswordForm'
import UpdateProfileForm from '../../partials/profile/UpdateProfileForm'

const Edit: React.FC<PageGlobalProps> = ({ auth }) => {
  return (
    <MainLayout>
      <Head title="Profile" />
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full">
          <ProfileNavigation />
          <div className="col-span-12 lg:col-span-8">
            <div className="card">
              <div>
                <UpdateProfileForm />
                <div className="my-5 mx-4 h-px bg-slate-200 dark:bg-navy-500"></div>
                {auth.user.has_password && (
                  <>
                    <UpdatePasswordForm />
                    <div className="my-5 mx-4 h-px bg-slate-200 dark:bg-navy-500"></div>
                  </>
                )}
                <DeleteAccountForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Edit
