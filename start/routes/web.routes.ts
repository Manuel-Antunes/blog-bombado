import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'web/HomeController').as('home')
  Route.resource('posts', 'web/PostsController').as('posts')
  Route.resource('categories', 'web/CategoriesController').as('categories')
  Route.resource('users', 'web/UsersController').as('users')

  Route.delete('/profile', 'web/ProfileController.destroy').as('profile.destroy')
  Route.put('/profile', 'web/ProfileController.update').as('profile.update')
  Route.get('/profile', 'web/ProfileController.edit').as('profile.edit')
  Route.get('/profile/notifications', 'web/ProfileNotificationsController.index').as(
    'profile.notifications'
  )
}).middleware('auth')
