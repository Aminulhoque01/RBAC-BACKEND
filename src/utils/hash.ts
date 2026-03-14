import bcrypt from "bcrypt"
import { config } from "../config"

export const hashPassword = async(password:string)=>{

 const salt = Number(config.bcrypt_salt)

 return bcrypt.hash(password,salt)

}

export const comparePassword = async(
 password:string,
 hashed:string
)=>{
 return bcrypt.compare(password,hashed)
}