import {Router} from "express";
import {userController} from "../controlers/user.controler";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";
import {fileMiddleware} from "../midlewares/files.midleware";
import {authMiddlewareForCheck} from "../midlewares/userAuthMidleware";
import {ERights} from "../enums/users.rights.enum";
import {authMiddleware} from "../midlewares/auth.middleware";

const router = Router();

router.get("", userController.getAll);
router.delete("",userMiddlewareForDel.deleteThrow,userController.Delete);
router.patch("/update",authMiddlewareForCheck.checkRightsOfUser(ERights.Admin),authMiddleware.checkAccessToken,userController.Update);
router.get(":name",userController.findByName);
router.post("/uploadAvatar",fileMiddleware.isAvatarValid,userController.uploadAvatar);



export const userRouter = router;