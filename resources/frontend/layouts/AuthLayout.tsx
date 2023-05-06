import { forwardRef, useRef } from 'react'

import { beSlot, useSlots } from '../hooks/useSlot'

import AppLogo from '../components/shared/AppLogo'
import AppProviders from '../partials/AppProviders'

interface AuthLayoutProps {
  children: React.ReactNode
}

interface AuthLayoutBannerProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const bannerRef = useRef<HTMLDivElement>(null)
  const slots = useSlots(children, bannerRef)
  return (
    <AppProviders>
      <div id="root" className="min-h-100vh dark:bg-navy-900 flex grow bg-slate-50">
        <>
          <div className="fixed top-0 hidden p-6 lg:block lg:px-12">
            <a href="#" className="flex items-center space-x-2">
              <AppLogo />
            </a>
          </div>
          {slots.authLayoutBanner}
          <main className="dark:bg-navy-700 flex w-full flex-col items-center bg-white lg:max-w-md">
            <div className="flex w-full max-w-sm grow flex-col justify-center p-5">{children}</div>
          </main>
        </>
      </div>
    </AppProviders>
  )
}

const AuthLayoutBanner = beSlot(
  forwardRef<HTMLDivElement, AuthLayoutBannerProps>(({ children }, ref) => {
    if (!ref) {
      return null
    }

    return (
      <div ref={ref} className="hidden w-full place-items-center lg:grid">
        <div className="w-full max-w-lg p-6">{children}</div>
      </div>
    )
  }),
  'authLayoutBanner'
)

export default Object.assign(AuthLayout, { Banner: AuthLayoutBanner })
