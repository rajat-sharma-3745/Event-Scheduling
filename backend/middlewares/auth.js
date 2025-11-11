import jwt from "jsonwebtoken";
import { ApiError } from "../utils/errorHandler.js";
import { prisma } from "../prismaClient.js";


export const auth = async (req, res, next) => {
    try {
        const token = req.cookies['token'];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded?.id) {
            return next(new ApiError('Invalid token payload', 401))
        }
        const user = await prisma.user.findUnique({
            where: { id: decoded?.id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            },
        })
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;

        next();

    } catch (error) {
        console.error('Token verification failed:', error.message);
        return next(new ApiError('Token verification failed', 401))
    }
}