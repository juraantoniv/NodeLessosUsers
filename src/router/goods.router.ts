import { Router } from "express";
import {goodsController} from "../controlers/goods.controler";
import {userMiddleware} from "../midlewares/user.midleware";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";
import {authMiddleware} from "../midlewares/auth.middleware";
import {buyDataRepository} from "../repositories/bought.data.repository";
import {buyController} from "../controlers/buy.controler";

const router = Router();

router.get("",authMiddleware.checkAccessToken, goodsController.getAll);
router.post("/buy",authMiddleware.checkAccessToken, goodsController.buyGoods);
router.post("/getBought", buyController.getAllBuId);

router.post("",goodsController.Create);

router.delete("",userMiddlewareForDel.deleteThrow,goodsController.Delete);

router.patch("",goodsController.Update);

router.get(":name",goodsController.findByName);



export const goodsRouter = router;