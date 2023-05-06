import Route from '@ioc:Adonis/Core/Route'

// authentication
Route.get('/login', 'web/AuthController.create')
Route.post('/login', 'web/AuthController.store')
Route.get('/logout', 'web/AuthController.destroy')
Route.get('/register', 'web/UsersController.create')

Route.get('/', async ({ inertia }) => {
  return inertia.render('Welcome')
}).middleware('auth')

Route.resource('users', 'web/UsersController').middleware({
  index: 'auth',
})
