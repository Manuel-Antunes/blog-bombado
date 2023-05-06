/*
|--------------------------------------------------------------------------
| Inertia Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  errors: (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  auth: (ctx) => {
    return {
      user: ctx.auth.user,
    }
  },
  success: (ctx) => {
    return ctx.session.flashMessages.get('success')
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
