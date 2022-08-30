import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { appKey } from 'Config/app'

export default class Matop {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    if(appKey!==request.header('appkey')){
      response.unauthorized({error:'You are not permitted'})
    }
    // code for middleware goes here. ABOVE THE NEXT CALL
    await next()
  }
}
