import bcrypt from "bcrypt";
import prisma from "../config/db_config.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const payload = req.body;
    const salt = bcrypt.genSaltSync(10);
    payload.password = bcrypt.hashSync(payload.password, salt);

    const user = await prisma.user.create({
      data: payload,
    });

    return res.status(201).json({ message: "User Created", user });
  } catch (error) {
    return res.status(400).json({ message: "Error in creating account" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.SECRET, {
          expiresIn: 3600,
        });

     

        return res.json({
          message: "Login Successful",
          access_token: `Bearer ${token}`,
        });

      }
      return res
        .status(401)
        .json({ message: "Invalid Credentials" });


    }

    return res
      .status(401)
      .json({ message: "Invalid Credentials"});
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ message: "Error in login" });
  }
};

export const user=(req,res)=>{
  const user=req.user;

  return res.status(200).json({user : user})
}

export const getUser=async(req,res)=>{
    const id= req.params.id
    console.log(typeof id)
    const user= await prisma.user.findUnique({
      where:{
        id:id
      }
    })

    return res.status(200).json({user: user})
}