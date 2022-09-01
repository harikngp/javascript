 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Crud from "App/Models/Crud"

export default class CrudsController {
    public async create({request}:HttpContextContract){
        let t = new Crud()
        t.id = request.input('id')
        t.name = request.input('name')
        t.email=request.input('email')
        t.save()
        }

        public async read(){
            return await Crud.all()
        }

        public async update(){
          const col=await Crud.findByOrFail('name','rake')
          col.name='jack'
          await col.save()
        }
        
        public async delete(){
            const col=await Crud.findByOrFail('id',2)
            col.delete()
            await col.save()
          }
}