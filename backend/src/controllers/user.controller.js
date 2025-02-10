import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {ApiResponce} from "../utils/apiResponce.js";
import {User} from "../models/user.model.js"
import mongoose from "mongoose";
import { Order } from "../models/order.model.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if(!user)
            throw new ApiError(400, "User not found");

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        if(!accessToken)
            throw new ApiError(400, "Access token not generated");
        if(!refreshToken)
            throw new ApiError(400, "Refresh token not generated");

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(400, error)
    }
}

const registerUser = asyncHandler( async (req, res) => {
    console.log(req.body);
    
    const {fullName, email, password, confirmPassword, location} = req.body;
    if(!fullName.trim())
        throw new ApiError(400, "Full Name is required");
    if(!email.trim())
        throw new ApiError(400, "Email is required");
    if(!password.trim())
        throw new ApiError(400, "Password is required");
    if(!confirmPassword.trim())
        throw new ApiError(400, "Confirm Password is required");
    if(!location.trim())
        throw new ApiError(400, "Location is required");
    
    if(password !== confirmPassword)
        throw new ApiError(400, "Passwords do not match");

    const isEmailExist = await User.findOne({email});
    if(isEmailExist)
        throw new ApiError(400, "Email already Exist");

    const user = await User.create({
        fullName,
        email,
        password,
        location
    })

    if(!user)
        throw new ApiError(400, "Failed to create user");

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    
    res.status(200).json(
        new ApiResponce(200, "User created successfully", createdUser)
    )
})

const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if(!email?.trim())
        throw new ApiError(400, "Email is required");
    if(!password?.trim())
        throw new ApiError(400, "Password is required");

    const user = await User.findOne({email});
    if(!user)
        throw new ApiError(400, "Email does not exist");

    const isCorrect = await user.isPasswordCorrect(password);
    if(!isCorrect)
        throw new ApiError(400, "Password is incorrect");

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findOne(user._id).select("-password -refreshToken");

    const options = {
        httpOnly: true,
        // secure: true,
        secure: false,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    }

    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponce(200, "Logged in successfully", {
            user: loggedInUser, accessToken, refreshToken
        })
    )
} )

const logoutUser = asyncHandler(async (req, res) => {
    console.log("user =",req.user);
    if(!req.user)
        throw new ApiError(400, "User is not logged in");
    
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                refreshToken: null
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    res
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .status(200)
    .json(
        new ApiResponce(200, "Logged out successfully")
    )
})

const getFoodDetails = asyncHandler(async (req, res) => {
    let foodCategories = await mongoose.connection.db.collection("foodCategories");
    let foodItems = await mongoose.connection.db.collection("menuItems");
    foodCategories = await foodCategories.find({}).toArray();
    foodItems = await foodItems.find({}).toArray();
    if(!foodCategories && !foodItems)
        throw new ApiError(400, "Food items not fetched");
    res
    .status(200)
    .json(
        new ApiResponce(200, "Food data fetched successfully", {foodCategories, foodItems})
    )
})

const orderHistory = asyncHandler(async (req, res) => {
    const {email, foodData} = req.body;

    // foodData.date = new Date().toLocaleDateString()
    const updatedFoodData = foodData.map((data, index) => {
        if(index === 0){
            data.date = new Date().toISOString().replace("T", " ").split(".")[0];;
            return data;
        }
        return data;
    })
    
    if(!email)
        throw new ApiError(400, "Invalid Credential");

    const isExist = await Order.findOne({email});
    if(!isExist){
        const orderData = await Order.create({
            email,
            orderItems: [updatedFoodData]
        })
        if(!orderData)
            throw new ApiError(400, "Order not created");
    }
    else{
        const orderData = await Order.findOneAndUpdate({email}, {
            $push: {
                orderItems: updatedFoodData
            }
        },
        {
            new: true
        })
        
        if(!orderData)
            throw new ApiError(400, "Order not created");
    }
    const datas = await Order.findOne({email});

    res
    .status(200)
    .json(
        new ApiResponce(200, "Order history created successfully", datas)
    )
})


const getOrderedData = asyncHandler(async (req, res) => {
    const email = req.body;
    // console.log(email);
    
    if(!email)
        throw new ApiError(400, "Invalid Credential");

    const orderedData = await Order.findOne(email);
    if(!orderedData)
        throw new ApiError(400, "No order history found");

    res
    .status(200)
    .json(
        new ApiResponce(200, "Order history found successfully", orderedData)
    )
})

export {registerUser, loginUser, logoutUser, getFoodDetails, orderHistory, getOrderedData}