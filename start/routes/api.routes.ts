import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('api/users', 'api/UsersController').apiOnly()
  Route.resource('posts.likes', 'api/LikesController').only(['store']).as('posts.likes')
  Route.resource('posts.saves', 'api/SavesController').only(['store']).as('posts.saves')
  Route.post('api/devices', 'api/DevicesController.store').as('devices.store')
}).middleware('auth')
