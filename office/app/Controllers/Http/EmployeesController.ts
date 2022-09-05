import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from "App/Models/Employee"
import EmployeeValidator from 'App/Validators/EmployeeValidator'
import Database from '@ioc:Adonis/Lucid/Database'
export default class EmployeesController {
    public async create({request}:HttpContextContract){
        try{
        const value=await request.validate(EmployeeValidator)
        let employee = new Employee()
        employee.id = value.id
        employee.name = value.name
        employee.teamId=value.teamId
        await employee.save()
        }
        catch{
            return "Invalid input"
        }
    }

    public async read(){
        return await Employee.all()
    }

    public async update({request}:HttpContextContract){
        try{
        const val=await request.validate(EmployeeValidator)
        const column=await Employee.findOrFail(request.input('id'))
        column.name = val.name
        column.teamId = val.teamId
        await column.save()
        }
        catch{
            return "Invalid ID: Not updated"
        }
    }
        
    public async delete({request}:HttpContextContract){
        try{
        const column=await Employee.findOrFail(request.input('id'))
        column.delete()
        await column.save()
        }
        catch{
            return "Invalid ID"
        }
    }

    public async join() {
        return Database.from('employees')
          .join('departments', 'employees.team_id', '=', 'departments.id')
          .select('employees.*')
          .select('departments.*')
    }
    
    public async getInfo({request}:HttpContextContract){
        try{
        const user=await Employee.findOrFail(request.input('id'))
        return user
        }
        catch{
            return "Invalid ID"
        }
    }
}