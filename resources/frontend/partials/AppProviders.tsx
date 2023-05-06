import React from 'react'
import { NotifierContextProvider } from 'react-headless-notifier'
import { RecoilRoot } from 'recoil'
import { ToastContainer } from '../services/toast'

export interface AppProvidersProps {
  children: React.ReactNode
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <RecoilRoot>
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
    </RecoilRoot>
  )
}

export default AppProviders
