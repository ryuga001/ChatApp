import express from "express"
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import UserRoutes from "./routes/user.js"
import MessageRoutes from "./routes/message.js"
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const PORT = 5000;

const server = createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

io.on("connection", (socket) => console.log("connected to socket.io", socket.id))

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/auth", UserRoutes);
app.use("/msg", MessageRoutes);


const MONGO_URI = "mongodb://0.0.0.0:27017/ChatAppReactNative";

mongoose.connect(MONGO_URI).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log("Error in Connecting to DB", err);
})

server.listen(PORT, () => {
    console.log("server is running at " + PORT);
})