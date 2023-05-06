import Route from '@ioc:Adonis/Core/Route'

Route.resource('api/users', 'api/UsersController').apiOnly()
