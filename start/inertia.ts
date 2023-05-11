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
  auth: async (ctx) => {
    return {
      user: ctx.auth.user,
      authenticated: ctx.auth.isLoggedIn,
      notifications: await ctx.auth.user?.unreadNotifications(),
    }
  },
  success: (ctx) => {
    return ctx.session.flashMessages.get('success')
  },
  params: (ctx) => {
    return ctx.params
  },
  infos: (ctx) => {
    return ctx.session.flashMessages.get('infos')
  },
}).version(() => Inertia.manifestFile('public/assets/manifest.json'))
