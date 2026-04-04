/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const user = await UserServices.createUser(req.body);

//         res.status(httpStatus.CREATED).json({
//             message: "User created successfully",
//             user,
//         });
//     } catch (error: any) {
//         console.log(error);
//         next(error);
//     }
// };

const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserServices.createUser(req.body);

        // res.status(httpStatus.CREATED).json({
        //     message: "User created successfully",
        //     user,
        // });

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User created successfully",
            data: user,
        });
    },
);

const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.getAllUsers();

        // res.status(httpStatus.OK).json({
        //     success: true,
        //     message: 'All users retrived successfully',
        //     users
        // })

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "All users retrived successfully",
            data: result.data,
            meta: result.meta,
        });
    },
);

const updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        // const token = req.headers.authorization;
        // const verifiedToken = verifyToken(
        //     token as string,
        //     envVars.JWT_ACCESS_SECRET,
        // );

        const verifiedToken = req.user;
        const payload = req.body;

        const user = await UserServices.updateUser(
            userId,
            payload,
            verifiedToken,
        );

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: 'User updated successfully!!!',
            data: user
        })
    },
);

export const UserControllers = {
    createUser,
    getAllUsers,
    updateUser
};
