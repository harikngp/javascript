
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public manager: string

  @column()
  public buildingNo:number

  @column()
  public street:string

  @column()
  public area:string

  @column()
  public district:string

  @column()
  public pincode:number

  @column()
  public email:string

  @column()
  public customerId:number

}
