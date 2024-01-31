"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controler_1 = require("../controlers/user.controler");
const users_rights_enum_1 = require("../enums/users.rights.enum");
const auth_middleware_1 = require("../midlewares/auth.middleware");
const files_midleware_1 = require("../midlewares/files.midleware");
const userAuthMidleware_1 = require("../midlewares/userAuthMidleware");
const userCheckIdMidleware_1 = require("../midlewares/userCheckIdMidleware");
const router = (0, express_1.Router)();
router.get("", userAuthMidleware_1.authMiddlewareForCheck.checkRightsOfUser(users_rights_enum_1.ERights.Admin), user_controler_1.userController.getAll);
router.delete("", userCheckIdMidleware_1.userMiddlewareForDel.deleteThrow, userAuthMidleware_1.authMiddlewareForCheck.checkRightsOfUser(users_rights_enum_1.ERights.Admin), user_controler_1.userController.Delete);
router.patch("/update", userAuthMidleware_1.authMiddlewareForCheck.checkRightsOfUser(users_rights_enum_1.ERights.Admin), auth_middleware_1.authMiddleware.checkAccessToken, user_controler_1.userController.Update);
router.get(":name", auth_middleware_1.authMiddleware.checkAccessToken, user_controler_1.userController.findByName);
router.post("/uploadAvatar", files_midleware_1.fileMiddleware.isAvatarValid, user_controler_1.userController.uploadAvatar);
exports.userRouter = router;
