import User from '../models/User';
let auth =(req,res,next)=>{ 

    let token=req.cookies.x_auth;
    console.log("토큰"+token)
User.findByToken(token,(err,user)=>{
    if(err) throw err;
    if(!user) {return res.json({isAuth:false,error:true})}
    else{
        req.token=token;
        req.user=user;
        next();
    }

 
})
}

export default auth;