'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => ({ greeting: 'Welcome to InnergyLab hackathon API!' }))

Route.group(() => {
  Route.resource('/house', 'HouseController')
  Route.resource('/car', 'CarController')
  Route.resource('/history', 'HistoryController')
  Route.resource('/route', 'RouteController')
  Route.get('/download/:id', 'ImageController.downloadImage')
  Route.post('/upload/:id', 'ImageController.uploadImage')
  Route.post('/scan', 'CardController.scan')
}).prefix('api/v1')
