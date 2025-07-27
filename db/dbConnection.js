import mongoose from "mongoose"


export const dbConnection = () => {
    try {
        const conn = mongoose.connect('mongodb://localhost:27017/SmartNoteApp')
        console.log("db connected successfully");
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
}