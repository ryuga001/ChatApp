import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { UserType } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
    const { userId, setUserId } = useContext(UserType);
    const navigation = useNavigation();
    const acceptRequest = async (friendRequestId) => {
        try {
            const response = await axios.post(
                "http://10.0.2.2:5000/auth/user/friend-request/accept",
                {

                    senderId: friendRequestId,
                    recepientId: userId,

                }
            );

            if (response.data.success) {
                setFriendRequests(
                    friendRequests.filter((request) => request._id !== friendRequestId)
                );
                navigation.navigate("Chats");
            }
        } catch (err) {
            console.log("error acceptin the friend request", err);
        }
    };
    return (
        <Pressable
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 10,
            }}
        >
            <View
                style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "purple", alignItems: "center", justifyContent: "center" }}
            >
                <Text style={{ color: "white", fontSize: 22 }}>{item?.username[0].toUpperCase()}</Text>
            </View>
            <View style={{
                flexDirection: "column", alignItems: "flex-start"
            }}>
                <Text
                    style={{ fontSize: 15, fontWeight: "bold" }}
                >{item?.username}</Text>
                <Text>
                    Sent you a friend request.
                </Text>
            </View>

            <Pressable
                onPress={() => acceptRequest(item._id)}
                style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
            >
                <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
            </Pressable>
        </Pressable>
    );
};

export default FriendRequest;

const styles = StyleSheet.create({});