import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt

        if(!token){
            return res.status(401).json({message:"Unauthorised -no token provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({message:"Unauthorised -Invalid Token"})
        }

        const user = await User.findById(decoded.userId)
        
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("Error in protect route middleware:", error.message)
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: "Invalid token"})
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token expired"})
        } else {
            res.status(500).json({message: "Internal server error in protect route", error: error.message})
        }
    }
}