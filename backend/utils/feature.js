import jwt from 'jsonwebtoken'
export const sendToken = (res,user,code,message) => {
   const token = jwt.sign({id:user.id},process.env.JWT_SECRET);
   const {password,...userWithoutPassword} = user;
   return res.status(code).cookie('token',token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge:15*24*60*1000
   }).json({
      success:true,
      message,user:userWithoutPassword
   })

}