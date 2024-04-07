import Message from "../models/message.js";


export const SingleMessage = async (req, res) => {
    try {
        // console.log(req.body);
        const { senderId, recepientId, messageType, messageText } = req.body;
        const newMessage = await Message.create({
            senderId,
            recepientId,
            messageType,
            message: messageText,
            imageUrl: messageType === 'image' ? req.file.path : null,
        })
        if (newMessage) {
            return res.status(200).json({
                message: "Message send Successfully",
                success: true,
            })
        } else {
            return res.status(406).json({
                message: "Unexpeted Error Occured",
                success: false,
            })
        }
    } catch (error) {
        console.log("Error in SingleMessage ", error);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        })
    }
}

export const fetchMessageBetweenUser = async (req, res) => {
    try {
        // const { senderId, recepientId } = req.params;
        const senderId = req.params.senderId;
        const recepientId = req.params.recepientId;
        // console.log(senderId, "sender");
        // console.log(recepientId, "receiver");
        const messages = await Message.find({
            $or: [
                { senderId: senderId, recepientId: recepientId },
                { senderId: recepientId, recepientId: senderId },
            ],
        }).populate("senderId", "_id username");
        if (!messages) {
            return res.status(404).json({
                message: "User not Found",
                success: false,
            })
        }
        return res.status(200).json({
            message: "successfully fetched messages",
            success: true,
            data: messages,
        })
    } catch (error) {
        console.log("Error in fetchMessageBetweenUser ", error);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        })

    }
}

export const DeleteMessage = async (req, res) => {
    try {
        const { message } = req.body;
        if (!Array.isArray(message) || message.length === 0) {
            return res.status(400).json({
                message: "Invalid Request",
                success: false
            })
        }

        await Message.deleteMany({ _id: { $in: message } });
        return res.status(200).json({
            message: "successfully deleted messages",
            success: true,
        })
    } catch (error) {
        console.log("Error in DeleteMessage ", error);
        return res.status(500).json({
            error: "Internal Server Error",
            success: false,
        })

    }
}