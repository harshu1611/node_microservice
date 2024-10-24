import jwt from "jsonwebtoken"

export const authMiddleware=(req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(authHeader == null || authHeader == undefined){
        res.status(401).json({message:"Unauthorized"})
    }

    const token= authHeader.split(" ")[1];

    jwt.verify(token,process.env.SECRET,(err,payload)=>{
            if(err){
                res.status(401).json({message:"Unauthorized"})
            }
            
            req.user=payload;

            next();
    })
}