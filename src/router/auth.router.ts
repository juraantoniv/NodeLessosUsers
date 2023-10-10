import { Router } from "express";
import {authController} from "../controlers/auth.controler"
import {userMiddleware} from "../midlewares/user.midleware";
import {authMiddleware} from "../midlewares/auth.middleware";



const router = Router();

router.post("/register",userMiddleware.createOrThrow, authController.register);
router.post("/login", authController.login);
router.get("/refresh",authMiddleware.checkRefreshToken, authController.refresh);
router.post("/confirmPassword",authMiddleware.checkActiveToken,authController.recordPassword)
router.post("/logout",authMiddleware.checkAccessToken,authController.logout)
router.post("/recoveryPassword",authMiddleware.checkRecoveryEmail,authController.recoveryPassword)

export const authRouter = router;