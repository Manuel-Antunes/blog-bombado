import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'web/HomeController').as('home')
  Route.resource('posts', 'web/PostsController').as('posts')

  Route.get('/profile', 'web/ProfileController.edit').as('profile.edit')
  Route.put('/profile', 'web/ProfileController.update').as('profile.update')
  Route.delete('/profile', 'web/ProfileController.destroy').as('profile.destroy')
}).middleware('auth')
