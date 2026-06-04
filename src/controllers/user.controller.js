import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudnary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user detail from frontend
  // validation - not empty
  // check user alredy exist: email , username
  // check for img check for avtar
  // upload to cloudnary and get string
  // create user object -create  entry i db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const { userName, email, fullName, avatar, coverImage, password } = req.body;
  if (
    [userName, email, fullName, avatar, coverImage, password].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields is required");
  }
  const exitedUser = User.findOne({
    $or: [{ userName }, { email }],
  });
  if (exitedUser) {
    throw new ApiError(409, "User with email or username alredy exists")
  }
  const avatarLocalPath =  req.files?.avatar[0]?.path;
  const coverImageLocalPath =  req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudnary(avatarLocalPath)
  const coverImage = await uploadOnCloudnary(coverImageLocalPath)


  if (!avatar) {
     throw new ApiError(400, "Avatar file is required")
  }

 const user =  User.create({
    fullName,
    avatar: avatar.url,
    coverImage: avatar.url?.url || "",
    email,
    password,
    userName: userName.toLowerCase()
  })
 const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
 )
 if (!createdUser) {
    throw new ApiError(500, "Something went wrong while regestering the user ")
 }
 return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Secessfully")
 )
});

export { registerUser };
