import Admin from '../../models/admin'
import { CreateAdminPropsInterface } from '../Interfaces/auth'

export const findAdmin = async (email:string) =>{
    let admin = null
    try {
        admin = await Admin.findOne({where:{email}})
        return admin
    } catch (error:any) {
        console.log(error.message)
        return admin
    }
}


export const createAdmin = async({email, hashedPassword}: CreateAdminPropsInterface) =>{
    try {
        const admin = await Admin.create({email, password:hashedPassword})
        return admin
    } catch (error: any) {
        throw error
    }
}