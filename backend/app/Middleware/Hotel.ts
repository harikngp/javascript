import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'
export default class Hotel {
  
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
  // code for middleware goes here. ABOVE THE NEXT CALL
  if(appKey!==request.header('appkey')){
    response.unauthorized({error:'You are not permitted'})
  }
    await next()
  }
}
