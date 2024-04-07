import User from "../models/user.js"
import { createTokenForUser, validateToken } from "../utils/auth.js";
export const Signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(406).json({
                message: "Complete All Fields ",
                success: false,
            })
        }
        const newUser = await User.findOne({ email });
        if (newUser) {
            return res.status(406).json({
                message: "User Already Exists",
                success: false,
                data: newUser,
            })
        }
        await User.create({
            username,
            email,
            password,
        })
        return res.status(200).json({
            message: "User registered successfully",
            success: true,
        })
    } catch (error) {
        return res.json({
            error: error,
            success: false,
        })
    }
}

export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(406).json({
                message: "Complete All Fields ",
                success: false,
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        if (user.password !== password) {
            return res.status(404).json({
                message: "Invalid Password!",
                success: false
            });
        }

        const token = createTokenForUser(user);

        return res.status(200).json({
            message: "successfully user logined",
            success: true,
            token: token,
        })

    } catch (error) {
        console.log("error in Signin", error);
        return res.status(500).json({
            error: error,
            success: false,
        })
    }
}

export const CurrentUser = async (req, res) => {
    const { token } = req.body;
    const payload = validateToken(token);
    if (payload) {
        return res.status(200).json({
            message: "success",
            success: true,
            data: payload,
        })
    }

    return res.status(406).json({
        message: "error",
        success: false,
    })
}


export const AllUserExceptCurrent = async (req, res) => {
    try {
        const loggedInUserId = req.params.userId;
        const AllUser = await User.find({ _id: { $ne: loggedInUserId } });
        if (AllUser) {
            return res.status(200).json({
                message: "fetch users successfull",
                success: true,
                data: AllUser,
            })
        } else {
            console.log("Error retrieving users", err);
            res.status(500).json({
                message: "Error retrieving users",
                success: false
            });
        }
    } catch (error) {
        console.log("error in AllUserExceptCurrent", error);
        return res.status(500).json({
            error: error,
            success: false,
        })
    }
}

export const FriendRequestSend = async (req, res) => {
    const { currentUserId, selectedUserId } = req.body;
    try {
        await User.findByIdAndUpdate(selectedUserId, {
            $push: { friendRequests: currentUserId },
        });
        await User.findByIdAndUpdate(currentUserId, {
            $push: { sentFriendRequest: selectedUserId },
        });
        return res.status(200).json({
            message: "Friend request send successfully",
            success: true
        })
    } catch (error) {
        console.log("error in FriendRequestSend", error);
        return res.status(500).json({
            success: false,
            error: error,
        })
    }
}

export const AllFrientRequest = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId).populate("friendRequests", "username email profileImage").lean();

        if (!user) {
            return res.status(404).json({
                message: "user doen't exists",
                success: false,
            })
        }
        return res.status(200).json({
            message: "successfully fetch friend requests",
            success: true,
            data: user.friendRequests,
        })
    } catch (error) {
        console.log("error in AllFriendRequest", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const AcceptFriendRequest = async (req, res) => {
    try {
        const { senderId, recepientId } = req.body;
        const sender = await User.findById(senderId);
        const recepient = await User.findById(recepientId);
        sender.friends.push(recepientId);
        recepient.friends.push(senderId);

        recepient.friendRequests = recepient.friendRequests.filter((request) => request.toString() !== senderId.toString());

        sender.sentFriendRequest = sender.sentFriendRequest.filter((request) => request.toString() !== recepientId.toString());

        await sender.save();
        await recepient.save();
        res.status(200).json({ message: "Friend Request accepted successfully", success: true });

    } catch (error) {
        console.log("error in AcceptFriendRequest", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const AllFriends = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate("friends", "username email profileImage").lean();
        if (user) {
            return res.status(200).json({
                message: "successfully fetch all friends",
                success: true,
                data: user.friends,
            })
        } else {
            return res.status(404).json({
                message: "user not found",
                success: false,
            })
        }
    } catch (error) {
        console.log("error in AllFriends", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const fetchUser = async (req, res) => {
    try {
        const id = req.params.id;
        const recepientUser = await User.findById(id);
        return res.status(200).json({
            message: "user fetch successfully",
            success: true,
            data: recepientUser,
        })
    } catch (error) {
        console.log("error in fetchUser", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
export const IndividualFriendRequestSent = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id).populate("sentFriendRequest", "username email profileImage").lean();
        const sentFriendRequest = user.sentFriendRequest;
        return res.status(200).json({
            message: "friend request sent fetch successfully",
            success: true,
            data: sentFriendRequest,
        })
    } catch (error) {
        console.log("error in IndividualFriendRequestSent", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const fetchFriends = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).populate('friends');
        if (user) {
            const friendsId = user.friends.map((item) => item._id);
            return res.status(200).json({
                message: "fetched friends successfully",
                success: true,
                data: friendsId,
            })
        } else {
            return res.status(404).json({
                message: "User not found",
                success: false,
            })
        }

    } catch (error) {
        console.log("error in fetchFriends", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}