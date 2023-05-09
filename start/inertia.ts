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
      authenticated: ctx.auth.isLoggedIn,
    }
  },
  success: (ctx) => {
    return ctx.session.flashMessages.get('success')
  },
  params: (ctx) => {
    return ctx.params
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
