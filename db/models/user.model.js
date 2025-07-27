import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    otp: String,
    otpExpiresAt: Date,
},
    { timestamps: true }
);


userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})



export const User = model("User", userSchema);