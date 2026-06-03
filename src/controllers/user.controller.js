import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler (async(req, res) => {
    // get user detail from frontend
    // validation - not empty 
    // check user alredy exist: email , username
    // check for img check for avtar 
    // upload to cloudnary and get string 
    // create user object -create  entry i db 
    // remove password and refresh token field from response 
    // check for user creation 
    // return response 
    
})

export { registerUser }