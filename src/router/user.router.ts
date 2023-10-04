import { Router } from "express";
import {userController} from "../controlers/user.controler";
import {userMiddleware} from "../midlewares/user.midleware";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";

const router = Router();

router.get("", userController.getAll);


router.delete("",userMiddlewareForDel.deleteThrow,userController.Delete);

router.patch("",userController.Update);

router.get(":name",userController.findByName);



export const userRouter = router;