import {Router} from "express";
import {goodsController} from "../controlers/goods.controler";
import {userMiddlewareForDel} from "../midlewares/userCheckIdMidleware";
import {authMiddleware} from "../midlewares/auth.middleware";
import {buyController} from "../controlers/buy.controler";
import {cardMiddleware} from "../midlewares/postCard.midleware";
import {authMiddlewareForCheck} from "../midlewares/userAuthMidleware";
import {ERights} from "../enums/users.rights.enum";

const router = Router();

router.get("",authMiddleware.checkAccessToken, goodsController.getAll);
router.get("/getById/:id",authMiddleware.checkAccessToken, goodsController.findById);
router.post("/buy",authMiddleware.checkAccessToken, goodsController.buyGoods);
router.get("/getUsersCars", buyController.getAllBuId);
router.post("",cardMiddleware.postCar,authMiddlewareForCheck.checkRightsOfUser(ERights.Seller),goodsController.Create);
router.delete("",userMiddlewareForDel.deleteThrow,authMiddlewareForCheck.checkRightsOfUser(ERights.Seller),authMiddlewareForCheck.checkRightsOfUser(ERights.Admin),goodsController.Delete);
router.patch("",authMiddleware.checkAccessToken,goodsController.Update);
router.get(":name",authMiddleware.checkAccessToken,goodsController.findByName);
router.get("/likes/:id",authMiddleware.checkAccessToken,goodsController.likes);
router.get("/dislikes/:id",authMiddleware.checkAccessToken,goodsController.dislikes);



export const carsRouter = router;