import { useRecoilState } from 'recoil'
import dashboardMeetDark from 'resources/frontend/assets/images/illustrations/dashboard-meet-dark.svg'
import dashboardMeet from 'resources/frontend/assets/images/illustrations/dashboard-meet.svg'

import { Else, If, Then } from 'react-if'

import React from 'react'
import darkModeAtom from '../../atoms/darkMode'
import AppLogo from '../../components/shared/AppLogo'
import AuthLayout from '../../layouts/AuthLayout'
import RegisterForm from '../../partials/auth/sign-up/SignUpForm'

const Register: React.FC = () => {
  const [darkMode] = useRecoilState(darkModeAtom)

  return (
    <AuthLayout>
      <AuthLayout.Banner>
        <If condition={darkMode}>
          <Then>
            <img className="w-full" id="hero-image-light" src={dashboardMeet} alt="image" />
          </Then>
          <Else>
            <img className="w-full" id="hero-image-dark" src={dashboardMeetDark} alt="image" />
          </Else>
        </If>
      </AuthLayout.Banner>

      <div className="flex w-full max-w-sm grow flex-col justify-center p-5">
        <div className="text-center">
          <AppLogo hideName />
          <div className="mt-4">
            <h2 className="dark:text-navy-100 text-2xl font-semibold text-slate-600">
              Welcome To Payless
            </h2>
            <p className="dark:text-navy-300 text-slate-400">Please sign up to continue</p>
          </div>
        </div>
        <RegisterForm />
      </div>
    </AuthLayout>
  )
}

export default Register
