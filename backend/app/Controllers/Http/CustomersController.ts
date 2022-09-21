import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Customer from "App/Models/Customer"
import CustomerValidator from 'App/Validators/CustomerValidator'
export default class CustomersController {
    public async create({request}:HttpContextContract){
        const valid=await request.validate(CustomerValidator)
        const customer=new Customer()
        customer.id=valid.id
        customer.name=valid.name
        await customer.save()
        return customer
    }

    public async read(){
        return await Database.from('customers')
        .leftJoin('hotels','customers.id','hotels.customer_id')
        .select('customers.*')
        .count('hotels.customer_id as branch')
        .groupBy('customers.id','customers.name')
        .orderBy('customers.name','asc')
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