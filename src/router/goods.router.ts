import { Router } from "express";
import {goodsController} from "../controlers/goods.controler";
import {userMiddleware} from "../midlewares/user.midleware";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";
import {authMiddleware} from "../midlewares/auth.middleware";

const router = Router();

router.get("",authMiddleware.checkAccessToken, goodsController.getAll);

router.post("",goodsController.Create);

router.delete("",userMiddlewareForDel.deleteThrow,goodsController.Delete);

router.patch("",goodsController.Update);

router.get(":name",goodsController.findByName);



export const goodsRouter = router;