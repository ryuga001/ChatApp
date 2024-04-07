import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        }
        ,
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String,
        },
        friendRequests: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ],
        sentFriendRequest: [
            {
                type: Schema.Types.ObjectId,
                ref: "user",
            }
        ]
    }
)
const User = model("user", UserSchema);

export default User;