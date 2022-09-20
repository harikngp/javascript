/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(()=>{
  Route.post('/create','HotelsController.create')
  Route.get('/read','HotelsController.read')
  Route.patch('/update','HotelsController.update')
  Route.delete('/delete/:id','HotelsController.delete')
  Route.post('/search','HotelsController.search')
  Route.post('/desc','HotelsController.desc')
  Route.post('/asc','HotelsController.asc')
}).prefix('/hotel')

Route.group(()=>{
  Route.post('/create','CustomersController.create')
  Route.get('/read','CustomersController.read')
  Route.patch('/update','CustomersController.update')
  Route.delete('/delete/:id','CustomersController.delete')
  Route.post('/search','CustomersController.search')
  Route.post('/desc','CustomersController.desc')
  Route.post('/asc','CustomersController.asc')
}).prefix('/customer')