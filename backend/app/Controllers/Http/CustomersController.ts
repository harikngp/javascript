import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from "App/Models/Customer"
export default class CustomersController {
    public async create({request}){
        const customer=new Customer()
        customer.name=request.input('name')
        await customer.save()
    }

    public async read(){
        return await Customer.query().orderBy('id','asc')
    }

    public async update({request}:HttpContextContract){
        try{
        const customer=await Customer.findByOrFail('id',request.input('id'))   
        customer.name=request.input('name')
        await customer.save()
        return customer
        }
        catch{
            return "Not updated"
        }
    }

    public async delete({request}:HttpContextContract){
        try{
        const customer=await Customer.findByOrFail('id',request.params().id)
        customer.delete()
        await customer.save()
        return customer
        }
        catch{
            return "Not deleted"
        }
    }

    public async search({request}:HttpContextContract){
        const search=request.input('search')
        if(/^[0-9]/.test(search))
            return Customer.query().where('id', search)
        else
            return Customer.query().where('name','ilike','%'+search+'%')
    }

    public async desc({request}:HttpContextContract){
        return await Customer.query().orderBy(request.input('item'),'desc')
    }

    public async asc({request}:HttpContextContract){
        return await Customer.query().orderBy(request.input('item'),'asc')
    }
}
