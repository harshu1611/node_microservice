import { prisma } from "../config/db_config.js"

export const getPosts=async(req,res)=>{
        const posts= await prisma.post.findMany()

        res.status(200).json({message:"Posts Fetched", posts:posts})
}

export const newPost=async(req,res)=>{
    try {
        const authUser=req.user;
        const {title,content,authorId}=req.body;
        const post= await prisma.post.create({
            data:{
                authorId: authUser.id,
                title:title,
                content:content
    
            }
        })
    
        return res.status(200).json({message:'post created successfully'})
    } catch (error) {
        res.status(500).json({message:"Something Went Wrong"})
    }
   
}