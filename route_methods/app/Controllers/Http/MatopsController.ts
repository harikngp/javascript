// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MatopValidator from "App/Validators/MatopValidator"
export default class MatopsController {
    public async arith({request}){
        const ip=await request.validate(MatopValidator)
        const a:number=ip['a']
        const b:number=ip['b']
        const add=a+b,sub=a-b,mul=a*b,div=a/b
        return 'Addition:'+add+'\nSubtraction:'+sub+'\nMultiplication:'+mul+'\nDivision:'+div
    }
}
