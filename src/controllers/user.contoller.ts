import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

interface IUserPayload {
  name: string;
  email: string;
  password: string;
}

class UserController {
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await prisma.user.findMany();
      res.json({
        status: true,
        message: "Successfully fetched user data",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const payload: IUserPayload = req.body;
      const user_data = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });
      if (user_data) {
        return res.status(400).json({
          status: false,
          message: "User already exists",
        });
      }
      const user = await prisma.user.create({
        data: payload,
      });
      res.json({
        status: true,
        message: "Successfully fetched user data",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
