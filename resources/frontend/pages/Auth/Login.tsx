import { Else, If, Then } from 'react-if'
import { useRecoilState } from 'recoil'
import dashboardCheckDark from 'resources/frontend/assets/images/illustrations/dashboard-check-dark.svg'
import dashboardCheck from 'resources/frontend/assets/images/illustrations/dashboard-check.svg'

import { Head } from '@inertiajs/react'
import React from 'react'
import darkModeAtom from '../../atoms/darkMode'
import AppLogo from '../../components/shared/AppLogo'
import AuthLayout from '../../layouts/AuthLayout'
import LoginForm from '../../partials/auth/LoginForm'

const LoginPage: React.FC = () => {
  const [darkMode] = useRecoilState(darkModeAtom)
  return (
    <AuthLayout>
      <Head title="Log in" />
      <AuthLayout.Banner>
        <If condition={darkMode}>
          <Then>
            <img className="w-full" id="hero-image-light" src={dashboardCheck} alt="image" />
          </Then>
          <Else>
            <img className="w-full" id="hero-image-dark" src={dashboardCheckDark} alt="image" />
          </Else>
        </If>
      </AuthLayout.Banner>
      <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
        <div className="text-center">
          <AppLogo hideName />
          <div className="mt-4">
            <h2 className="dark:text-navy-100 text-2xl font-semibold text-slate-600">
              Welcome Back
            </h2>
            <p className="dark:text-navy-300 text-slate-400">Please sign in to continue</p>
          </div>
        </div>
        <LoginForm />
      </div>
      <div className="dark:text-navy-300 my-5 flex justify-center text-xs text-slate-400">
        <a href="#">Privacy Notice</a>
        <div className="dark:bg-navy-500 mx-3 my-1 w-px bg-slate-200" />
        <a href="#">Term of service</a>
      </div>
    </AuthLayout>
  )
}

export default LoginPage
