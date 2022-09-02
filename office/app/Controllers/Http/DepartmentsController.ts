import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Department from 'App/Models/Department'
import DepartmentValidator from 'App/Validators/DepartmentValidator'
import Database from '@ioc:Adonis/Lucid/Database'
export default class DepartmentsController {
    public async create({request}:HttpContextContract){
        const val=await request.validate(DepartmentValidator)
        const dept = new Department()
        dept.id = val['id']
        dept.name = val['name']
        dept.shift=val['shift']
        await dept.save()
    }

    public async read(){
        return await Department.all()
    }

    public async update({request}:HttpContextContract){
        const val=await request.validate(DepartmentValidator)
        const column=await Department.findOrFail(request.input('id'))
        column.name = val.name
        column.shift = val.shift
        await column.save()
    }
        
    public async delete({request}:HttpContextContract){
        const column=await Department.findOrFail(request.input('id'))
        column.delete()
        await column.save()   
    }

    public async join() {
        return Database.from('employees')
          .join('departments', 'employees.team_id', '=', 'departments.id')
          .select('employees.*')
          .select('departments.*')
    }

    public async getInfo({request}:HttpContextContract){
        const team=await Department.findOrFail(request.input('id'))
        return team
    }
}