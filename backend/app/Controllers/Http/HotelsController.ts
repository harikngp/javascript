import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from "App/Models/Hotel"
import Database from '@ioc:Adonis/Lucid/Database'
import HotelValidator from "App/Validators/HotelValidator"

export default class HotelsController {
    public async create({request}:HttpContextContract){
        try{
            const valid=await request.validate(HotelValidator)
            const hotel=new Hotel()
            hotel.manager=valid.manager
            hotel.buildingNo=valid.buildingNo
            hotel.street=valid.street
            hotel.area=valid.area
            hotel.district=valid.district
            hotel.pincode=valid.pincode
            hotel.email=valid.email
            hotel.customerId=valid.customerId
            await hotel.save()
            return hotel
        }
        catch{
            return "Invalid input"
        }
    }

    public async read(){
        return await Hotel.query()
        .leftJoin('customers','customers.id','hotels.customer_id')
        .select('hotels.*')
        .select(Database.raw(`json_build_object('building_no',building_no,'street', street,'area',area,'district',district,'pincode',pincode) as address`))
        .select('customers.name as name')
        .orderBy('hotels.id','asc')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    name: info.$extras.name,
                    address:info.$extras.address,
                }
            })
        )
    }

    public async update({request}:HttpContextContract){
        try{
        const valid=await request.validate(HotelValidator)
        const hotel=await Hotel.findByOrFail('id',request.input('id'))
        hotel.manager=valid.manager
        hotel.buildingNo=valid.buildingNo
        hotel.street=valid.street
        hotel.area=valid.area
        hotel.district=valid.district
        hotel.pincode=valid.pincode
        hotel.email=valid.email
        hotel.customerId=valid.customerId
        await hotel.save()
        return hotel
        }
        catch{
            return "Not updated"
        }
    }

    public async delete({request}:HttpContextContract){
        try{
        const hotel=await Hotel.findByOrFail('id',request.params().id)
        hotel.delete()
        await hotel.save()
        return hotel
        }
        catch{
            return "Not deleted"
        }
    }

    public async search({request}:HttpContextContract){
        const search=request.input('search')
        return await Hotel.query()
        .leftJoin('customers','customers.id','hotels.customer_id')
        .select('hotels.*')
        .select(Database.raw(`json_build_object('building_no',building_no,'street', street,'area',area,'district',district,'pincode',pincode) as address`))
        .select('customers.name as name')
        .orderBy('hotels.id','asc')
        .where((query)=>{ 
            if(/^[0-9]/.test(search)){
                query.where('hotels.id',search)
                .orWhere('hotels.pincode',search)
                .orWhere('hotels.building_no',search)
                .orWhere('hotels.customer_id',search)
            }
            else{
                query.whereILike('manager','%'+search+'%')
                .orWhereILike('email','%'+search+'%')
                .orWhereILike('street','%'+search+'%')
                .orWhereILike('area','%'+search+'%')
                .orWhereILike('district','%'+search+'%')
            }
        })
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    name: info.$extras.name,
                    address:info.$extras.address,
                }
            })
        )
    }

    public async desc({request}:HttpContextContract){
        return await Hotel.query()
        .leftJoin('customers','customers.id','hotels.customer_id')
        .select('hotels.*')
        .select(Database.raw(`json_build_object('building_no',building_no,'street', street,'area',area,'district',district,'pincode',pincode) as address`))
        .select('customers.name as name')
        .orderBy(request.input('item'),'desc')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    name: info.$extras.name,
                    address:info.$extras.address,
                }
            })
        )
    }

    public async asc({request}:HttpContextContract){
        return await Hotel.query()
        .leftJoin('customers','customers.id','hotels.customer_id')
        .select('hotels.*')
        .select(Database.raw(`json_build_object('building_no',building_no,'street', street,'area',area,'district',district,'pincode',pincode) as address`))
        .select('customers.name as name')
        .orderBy(request.input('item'),'asc')
        .then( data => 
            data.map((i) => {
                const info=i.toJSON()
                return {
                    ...info,
                    name: info.$extras.name,
                    address:info.$extras.address,
                }
            })
        )
    }

}
