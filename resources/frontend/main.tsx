import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/react'
import { getAnalytics } from 'firebase/analytics'
import React from 'react'
import { createRoot } from 'react-dom/client'
import AppProviders from './App'
import './bootstrap'
import app from './services/firebase'
import './styles/app.css'

// getAnalytics(app)

createInertiaApp({
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.tsx', { eager: true })
    const page: any = pages[`./pages/${name}.tsx`]
    page.default.layout =
      page.default.layout || ((page: React.ReactNode) => <AppProviders children={page} />)
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render((<App {...props} />) as React.ReactElement)
  },
})

InertiaProgress.init()
