import React from 'react'
import { NotifierContextProvider } from 'react-headless-notifier'
import { RecoilRoot } from 'recoil'
import Preloader from './components/shared/Preloader'
import StardustProvider from './contexts/Stardust'
import { ToastContainer } from './services/toast'

export interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <RecoilRoot>
      <StardustProvider>
        <Preloader />
        <NotifierContextProvider
          config={{
            max: null,
            duration: 5000,
            position: 'bottomRight',
          }}
        >
          {children}
          <ToastContainer />
        </NotifierContextProvider>
      </StardustProvider>
    </RecoilRoot>
  )
}

export default AppProviders
