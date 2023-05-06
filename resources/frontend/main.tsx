import { InertiaProgress } from '@inertiajs/progress'
import { createInertiaApp, router } from '@inertiajs/react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import Swal from 'sweetalert2'
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

router.on('before', (event) => {
  Swal.fire({
    title: 'Carregando...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading()
    },
  })
})

router.on('finish', (event) => {
  Swal.close()
})

InertiaProgress.init()
