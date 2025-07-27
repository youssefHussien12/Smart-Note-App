import { User } from "../../db/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const checkEmail = async (req, res, next) => {
    let isExist = await User.findOne({ email: req.body?.email })
    if (isExist) return next(new AppError('user already exist', 409))
    next()
}