import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hotel from "App/Models/Hotel"
//import HotelValidator from "App/Validators/HotelValidator"

export default class HotelsController {
    public async create({request}:HttpContextContract){
        try{
            // const valid=await request.validate(HotelValidator)
            // const hotel=new Hotel()
            // hotel.owner=valid.owner
            // hotel.buildingNo=valid.buildingNo
            // hotel.street=valid.street
            // hotel.area=valid.area
            // hotel.district=valid.district
            // hotel.pincode=valid.pincode
            const hotel=new Hotel()
            hotel.owner=request.input('owner')
            await hotel.save()
            return hotel
        }
        catch{
            return "Invalid input"
        }
    }

    public async read(){
        return await Hotel.query().joinRaw('id'+'owner').orderBy('id','asc')
    }

    public async update({request}:HttpContextContract){
        try{
        // const valid=await request.validate(HotelValidator)
        // const hotel=await Hotel.findByOrFail('id',request.params().id)
        // hotel.owner=valid.owner
        // hotel.buildingNo=valid.buildingNo
        // hotel.street=valid.street
        // hotel.area=valid.area
        // hotel.district=valid.district
        // hotel.pincode=valid.pincode
        const hotel=await Hotel.findByOrFail('id',request.input('id'))   
        hotel.owner=request.input('owner')
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
        if(/^[0-9]/.test(search))
            return Hotel.query().where('id', search)
        else
            return Hotel.query().where('owner','ilike','%'+search+'%')
            //.orWhere('address','ilike','%'+search+'%')
    }

    public async desc({request}:HttpContextContract){
        return await Hotel.query().orderBy(request.input('item'),'desc')
    }

    public async asc({request}:HttpContextContract){
        return await Hotel.query().orderBy(request.input('item'),'asc')
    }
}
