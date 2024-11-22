"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authentication_1 = require("../middlewares/authentication");
const userRouter = express_1.default.Router();
userRouter.post("/signup", user_1.signupUser);
userRouter.post("/login", user_1.loginUser);
userRouter.post("/check", authentication_1.authentication, user_1.loginUser);
exports.default = userRouter;
