import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
import Database from '@ioc:Adonis/Lucid/Database'
export default class DepartmentsController {
    public async create({request}:HttpContextContract){
        try{
        const value=await request.validate(DepartmentValidator)
        const department = new Department()
        department.id = value.id
        department.name = value.name
        department.shift=value.shift
        await department.save()
        }
        catch{
            return "Invalid input"
        }
    }

    public async read(){
        return await Department.all()
    }

    public async update({request}:HttpContextContract){
        try{
        const val=await request.validate(DepartmentValidator)
        const column=await Department.findOrFail(request.input('id'))
        column.name = val.name
        column.shift = val.shift
        await column.save()
        }
        catch{
            return "Invalid input: Not updated"
        }
    }
        
    public async delete({request}:HttpContextContract){
        try{
        const column=await Department.findOrFail(request.input('id'))
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
        const team=await Department.findOrFail(request.input('id'))
        return team
        }
        catch{
            return "Invalid ID"
        }
    }
}