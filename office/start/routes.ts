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
  Route.post('createEmp','EmployeesController.create')
  Route.get('readEmp','EmployeesController.read')
  Route.patch('updateEmp','EmployeesController.update')
  Route.delete('deleteEmp','EmployeesController.delete')
  Route.post('joinEmp','EmployeesController.join')
  Route.post('infoEmp','EmployeesController.getInfo')
}).middleware('emp')

Route.group(()=>{
  Route.post('createDept','DepartmentsController.create')
  Route.get('readDept','DepartmentsController.read')
  Route.patch('updateDept','DepartmentsController.update')
  Route.delete('deleteDept','DepartmentsController.delete')
  Route.post('joinDept','DepartmentsController.join')
  Route.post('infoDept','DepartmentsController.getInfo')
}).middleware('dept')
Route.post('join','.join')