import { Router } from "express";

import UserController from "../controllers/user.contoller";

const router = Router();
const userController = new UserController();

router.get("/", userController.getUsers);
router.post("/", userController.registerUser);

export default router;
