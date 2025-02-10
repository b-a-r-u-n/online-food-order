import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler(
    async (req, _, next) => {
        try {
            // const cookie = await req.cookies
            // console.log("Cookie",cookie);
            
            const token = await req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
            // console.log("token", token);
            
            if(!token)
                throw new ApiError(401, "Unauthorized request");
    
            const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            // console.log("verifyToken",verifyToken);
    
            const user = await User.findById(verifyToken?._id).select("-password -refreshToken");
            if(!user)
                throw new ApiError(401, "Invalid Access Token!!");
    
            req.user = user;
            next();
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid access token")
        }
    }
)
