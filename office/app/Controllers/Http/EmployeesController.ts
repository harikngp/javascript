import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from "App/Models/Employee"
import EmployeeValidator from 'App/Validators/EmployeeValidator'
import Database from '@ioc:Adonis/Lucid/Database'
export default class EmployeesController {
    public async create({request}:HttpContextContract){
        const val=await request.validate(EmployeeValidator)
        let emp = new Employee()
        emp.id = val.id
        emp.name = val.name
        emp.teamId=val.teamId
        await emp.save()
    }

    public async read(){
        return await Employee.all()
    }

    public async update({request}:HttpContextContract){
        const val=await request.validate(EmployeeValidator)
        const column=await Employee.findOrFail(request.input('id'))
        column.name = val.name
        column.teamId = val.teamId
        await column.save()
    }
        
    public async delete({request}:HttpContextContract){
        const column=await Employee.findOrFail(request.input('id'))
        column.delete()
        await column.save()
    }

    public async join() {
        return Database.from('employees')
          .join('departments', 'employees.team_id', '=', 'departments.id')
          .select('employees.*')
          .select('departments.shift')
    }
    
    public async getInfo({request}:HttpContextContract){
        const user=await Employee.findBy('name',request.input('name'))
        return user
    }
}