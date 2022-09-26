import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Customer from "App/Models/Customer"
import CustomerValidator from 'App/Validators/CustomerValidator'
export default class CustomersController {
    info=this.read()
    public async create({request}:HttpContextContract){
        const valid=await request.validate(CustomerValidator)
        const customer=new Customer()
        customer.id=valid.id
        customer.name=valid.name
        await customer.save()
        return customer
    }

    public async read(){
        return await Customer.query()
        .leftJoin('hotels','hotels.customer_id','customers.id')
        .select('customers.*')
        .count('hotels.customer_id as branch')
        .groupBy('customers.id')
        .orderBy('customers.id')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    branch: i.$extras.branch,
                }
            })
        )
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
        return await Customer.query()
        .leftJoin('hotels','hotels.customer_id','customers.id')
        .select('customers.*')
        .count('hotels.customer_id as branch')
        .groupBy('customers.id')
        .orderBy('customers.id','asc')
        .where((query)=>{ 
            if(/^[0-9]/.test(search))
                query.where('customers.id', search)
            else
                query.whereILike('name','%'+search+'%')
        })
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    branch: i.$extras.branch,
                }
            })
        )
    }

    public async desc({request}:HttpContextContract){
        return await Customer.query()
        .leftJoin('hotels','customers.id','hotels.customer_id')
        .select('customers.*')
        .count('hotels.customer_id as branch')
        .groupBy('customers.id')
        .orderBy(request.input('item'),'desc')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    branch: i.$extras.branch,
                }
            })
        )
    }

    public async asc({request}:HttpContextContract){
        
        return await Customer.query()
        .leftJoin('hotels','customers.id','hotels.customer_id')
        .select('customers.*')
        .count('hotels.customer_id as branch')
        .groupBy('customers.id')
        .orderBy(request.input('item'),'asc')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    branch: i.$extras.branch,
                }
            })
        )
    }
}