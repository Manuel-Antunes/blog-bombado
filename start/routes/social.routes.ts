import Route from '@ioc:Adonis/Core/Route'

// google
Route.get('/google/redirect', 'social/GoogleAuthController.redirect')
Route.get('/google/callback', 'social/GoogleAuthController.callback')
