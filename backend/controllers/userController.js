import { prisma } from "../prismaClient.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";
import { sendToken } from "../utils/feature.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    if ([name, email, password].some(el => el?.trim() === "")) {
        return next(new ApiError('All fields are required', 400))
    }
    let user = await prisma.user.findUnique({
        where: { email }
    })
    if (user) {
        return next(new ApiError("User already exists", 400))
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    });
    sendToken(res, user, 201, "Registered successfully");
})
export const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if ([email, password].some(el => el?.trim() === "")) {
        return next(new ApiError('All fields are required', 400))
    }
    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (!user) return next(new ApiError("Invalid credentials", 400))
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ApiError("Invalid credentials", 400))
    sendToken(res, user, 200, "Logged in successfully")
})