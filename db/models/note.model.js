import { model, Schema } from "mongoose";

const noteSchema = new Schema({
   title:{
       type: String,
       required: true
   },
   content:{
       type: String,
       required: true
   },
   ownerId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
   }
    
},
{timestamps: true}) 

export const Note = model("Note", noteSchema)