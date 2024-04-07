
import { Schema, model } from "mongoose";

const MessageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
        ,
        recepientId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        messageType: {
            type: String,
            enum: ["text", 'image'],
        },
        message: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        timeStamp: {
            type: Date,
            default: Date.now(),
        },
    }
)
const Message = model("message", MessageSchema);
export default Message;