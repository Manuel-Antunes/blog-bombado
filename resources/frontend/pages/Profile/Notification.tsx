import { Head } from '@inertiajs/react'
import React from 'react'
import MainLayout from '../../layouts/MainLayout'
import ProfileNavigation from '../../partials/profile/ProfileNavigation'

const Notification: React.FC = () => {
  return (
    <MainLayout>
      <Head title="Profile Notifications" />
      <div className="container mx-auto mt-10">
        <div className="grid grid-cols-12 gap-4 sm:gap-5 lg:gap-6 w-full">
          <ProfileNavigation />
          <div className="col-span-12 lg:col-span-8"></div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Notification
