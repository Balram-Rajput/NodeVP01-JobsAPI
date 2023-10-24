const UserSchema = require("../models/User")
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req,res,next)=>{

        const authHeader =  req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer")){
            throw new UnauthenticatedError("Authentication Invalid")
        }
        const token = authHeader.split(" ")[1];

        try{
            const payload = await jwt.verify(token,process.env.JWT_SECRET);
            
            //check user from database then return
            // const user = await UserSchema.findById(payload.userId).select("-password");
            // req.user = user;

            // attach the user to the job router;
            req.user = {userId:payload.userId,name:payload.name}
            next() 
            
        }catch{
            throw new UnauthenticatedError("Invalid Access Token")
        }
 
}

module.exports = auth