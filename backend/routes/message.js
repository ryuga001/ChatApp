import { Router } from "express";

import multer from "multer";
import { DeleteMessage, SingleMessage, fetchMessageBetweenUser } from "../controllers/message.js";

const router = Router();
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.round() * 1e9) + "-" + file.originalname;
        cb(null, uniqueSuffix);
    },
});

const upload = multer({ storage: storage });

router.post("/message", upload.single("imageFile"), SingleMessage);
router.get("/messages/:senderId/:recepientId", fetchMessageBetweenUser);
router.post("/deleteMessages", DeleteMessage)

export default router;