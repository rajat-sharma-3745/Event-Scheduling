import { Prisma } from '@prisma/client'
const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    if (err instanceof Prisma.PrismaClientInitializationError) {
        return res.status(500).json({
            success: false,
            message: "Database connection failed. Please try again later."
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export { errorMiddleware }