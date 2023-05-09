import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('register', 'web/auth/RegisteredUserController.create').as('register')

  Route.post('register', 'web/auth/RegisteredUserController.store')

  Route.get('login', 'web/auth/AuthenticatedSessionController.create').as('login')

  Route.post('login', 'web/auth/AuthenticatedSessionController.store')

  Route.get('forgot-password', 'web/auth/PasswordResetLinkController.create').as('password.request')

  Route.post('forgot-password', 'web/auth/PasswordResetLinkController.store').as('password.email')

  Route.get('reset-password/:token', 'web/auth/NewPasswordController.create').as('password.reset')

  Route.post('reset-password', 'web/auth/NewPasswordController.store').as('password.store')
}).middleware('guest')

Route.group(() => {
  Route.get('verify-email', 'web/auth/EmailVerificationPromptController.show').as(
    'verification.notice'
  )

  Route.get('verify-email/:id/:hash', 'web/auth/VerifyEmailController.verify').as(
    'verification.verify'
  )

  Route.post(
    'email/verification-notification',
    'web/auth/EmailVerificationNotificationController.store'
  ).as('verification.send')

  Route.get('confirm-password', 'web/auth/ConfirmablePasswordController.show').as(
    'password.confirm'
  )

  Route.post('confirm-password', 'web/auth/ConfirmablePasswordController.store')

  Route.put('password', 'web/auth/PasswordController.update').as('password.update')

  Route.get('logout', 'web/auth/AuthenticatedSessionController.destroy').as('logout')
}).middleware('auth')
