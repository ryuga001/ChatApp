import { Router } from "express";
import { AcceptFriendRequest, AllFriends, AllFrientRequest, AllUserExceptCurrent, CurrentUser, FriendRequestSend, IndividualFriendRequestSent, Signin, Signup, fetchFriends, fetchUser } from "../controllers/user.js";

const router = Router();

router.post("/register", Signup);
router.post("/login", Signin);
router.post("/currentUser", CurrentUser);
router.get("/users/:userId", AllUserExceptCurrent);
router.post("/user/friend-request", FriendRequestSend);
router.get("/user/all-friend-request/:userId", AllFrientRequest);
router.post("/user/friend-request/accept", AcceptFriendRequest)

router.get("/user/accepted-friends/:id", AllFriends);

router.get("/user/:id", fetchUser);
router.get("/friend-requests/sent/:id", IndividualFriendRequestSent);

router.get("/friends/:id", fetchFriends);
export default router;