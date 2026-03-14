export const checkPermission = (permission:string)=>{

 return (req:any,res:any,next:any)=>{

  const userPermissions = req.user.permissions

  if(!userPermissions.includes(permission)){
   return res.status(403).json({
    message:"Forbidden"
   })
  }

  next()

 }

}
