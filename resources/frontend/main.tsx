import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/app.css'

export function resolvePageComponent(name: string, pages: Record<string, any>) {
  for (const path in pages) {
    if (path.endsWith(`${name.replace('.', '/')}.tsx`)) {
      return typeof pages[path] === 'function' ? pages[path]() : pages[path]
    }
  }

  throw new Error(`Page not found: ${name}`)
}

createInertiaApp({
  resolve: (name) => {
    return resolvePageComponent(name, import.meta.glob('./pages/**/*.tsx'))
  },
  setup({ el, App, props }) {
    createRoot(el).render((<App {...props} />) as React.ReactElement)
  },
})

InertiaProgress.init()
