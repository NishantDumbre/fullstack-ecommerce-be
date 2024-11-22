"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.signupUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, process.env.TOKEN_SECRET_KEY);
};
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { signupEmail, signupPassword } = req.body;
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    bcrypt_1.default.hash(signupPassword, saltRounds, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            console.log(err);
            res.status(502).json({ message: "Internal server error" });
        }
        try {
            const instance = new user_1.default({
                email: signupEmail,
                password: hash,
            });
            yield instance.save();
            return res.status(200).json({ message: "Account created successfully!" });
        }
        catch (error) {
            console.log(error);
            return res.status(409).json({ message: "User already registered" });
        }
    }));
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { loginEmail, loginPassword } = req.body;
    try {
        const user = yield user_1.default.findOne({ email: loginEmail });
        if (!user) {
            res.status(404).json({ message: "User not registered" });
            return;
        }
        const fetchedPassword = user.password;
        bcrypt_1.default.compare(loginPassword, fetchedPassword, (err, result) => {
            if (err)
                throw new Error("Something went wrong");
            if (result === false) {
                res
                    .status(401)
                    .json({ success: false, message: "Entered password is wrong" });
            }
            else {
                const token = generateToken(user.id, user.email);
                res.cookie("auth_token", token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: "lax",
                    maxAge: 60 * 60 * 1000,
                });
                res
                    .status(200)
                    .json({
                    success: true,
                    message: "Logged in successfully",
                    user: { id: user.id, email: user.email },
                });
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
});
exports.loginUser = loginUser;
