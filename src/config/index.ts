import dotenv from "dotenv"

dotenv.config()

export const config = {
 port: process.env.PORT,
 db_url: process.env.DB_URL,

 jwt_access_secret: process.env.JWT_ACCESS_SECRET,
 jwt_access_expire: process.env.JWT_ACCESS_EXPIRE,

 jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
 jwt_refresh_expire: process.env.JWT_REFRESH_EXPIRE,

 bcrypt_salt: process.env.BCRYPT_SALT
}