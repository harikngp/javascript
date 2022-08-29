// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CntrlsController {
    public async arith({request}){
        var a:number=request.input('a')
        var b:number=request.input('b')
        return a+b
    }
}
