const jwt=require('jsonwebtoken')
const secret = process.env.SECRET;
module.exports=function (req,res,next){
    try{
        let token=req.header('Authorization')
        if(!token){
            console.log("no token")
            return res.status(400).send('token not found')
        }
        let decoded=jwt.verify(token,secret)//we get payload as user onject inside our id
        //console.log(decoded)
        req.user=decoded.user
       // console.log("decoded.user",decoded.user)
        next()
       
    }
    catch(err){
        console.log(err);
        return res.status(500).send('server error')
    }
}