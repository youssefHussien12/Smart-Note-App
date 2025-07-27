import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { User } from "../../../db/models/user.model.js"
import { AppError } from "../../utils/AppError.js"
import { catchError } from "../../middleware/catchError.js"
import { sendEmail } from "../../utils/sendEmail.js"



const signUp = async (req, res, next) => {
    let user = new User(req.body)
    await user.save()
    let token = jwt.sign({ userId: user._id }, process.env.JWT_KEY)
    res.status(201).json({ message: "success", success: true, token, data: user })
}


const signIn = async (req, res, next) => {
    let user = await User.findOne({ email: req.body.email })
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
        return res.status(200).json({ message: "success", token });
    }
    next(new AppError("inccorect email or password", 401))
}

const isAuthenticated = catchError(async (req, res, next) => {
    let { token } = req.headers;
    if (!token) next(new AppError("token not provided", 401))
    let userPayload = null;
    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if (err) return next(new AppError(err, 401))
        userPayload = payload
    })

    let user = await User.findById(userPayload.userId)
    if (!user) next(new AppError("user not found", 404))
    req.user = user
    next()
})


const forgetPassword = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(200).json({ message: "If the email exists, OTP has been sent." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({ to: email, subject: "Password Reset OTP", message: `Your OTP: ${otp}` });

    res.status(200).json({ message: "If the email exists, OTP has been sent." });
};

const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({ email, otp });
    if (!user || !user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
        return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful." });
};



export {
    signUp,
    signIn,
    isAuthenticated,
    forgetPassword,
    resetPassword,
}