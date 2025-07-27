import { Router } from "express";
import { catchError } from "../../middleware/catchError.js";
import { forgetPassword, isAuthenticated, resetPassword, signIn, signUp } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmail.js";

const authRouter = Router()


authRouter.post("/sign-up", checkEmail, catchError(signUp))
authRouter.post("/sign-in", catchError(signIn))
authRouter.post("/forget-password", isAuthenticated, catchError(forgetPassword));
authRouter.post("/reset-password", isAuthenticated, catchError(resetPassword));

export default authRouter