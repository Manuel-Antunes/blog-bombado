import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('api/users', 'api/UsersController').apiOnly()
  Route.resource('posts.likes', 'api/LikesController').only(['store']).as('posts.likes')
}).middleware('auth')
