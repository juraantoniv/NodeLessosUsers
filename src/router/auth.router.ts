import { Router } from "express";
import {authController} from "../controlers/auth.controler"
import {userMiddleware} from "../midlewares/user.midleware";
import {authMiddleware} from "../midlewares/auth.middleware";



const router = Router();

router.post("/register",userMiddleware.createOrThrow, authController.register);
router.post("/login", authController.login);
router.post("/refresh",authMiddleware.checkRefreshToken, authController.refresh);

export const authRouter = router;