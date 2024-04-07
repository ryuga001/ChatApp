import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext'
import axios from 'axios';

const User = ({ item }) => {
    // console.log(item);
    const { userId, setUserId } = useContext(UserType);
    const [requestSent, setRequestSent] = useState(false);
    const [friendRequest, setFriendRequest] = useState([]);
    const [userFriends, setUserFriends] = useState([]);

    const fetchUserFriends = async () => {
        try {
            const response = await axios.get(`http://10.0.2.2:5000/auth/friends/${userId}`);
            if (response.data.success) {
                setUserFriends(response.data.data);
            } else {
                console.log("error retrieving user friends", response.status);
            }
        } catch (error) {
            console.log("Error message", error);
        }
    };
    const fetchFriendRequests = async () => {
        try {
            const response = await axios.get(
                `http://10.0.2.2:5000/auth/friend-requests/sent/${userId}`
            );


            if (response.data.success) {
                setFriendRequest(response.data.data);
            } else {
                console.log("error", response.status);
            }
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {

        fetchUserFriends();
        fetchFriendRequests();
    }, []);

    const sendFriendRequest = async (currentUserId, selectedUserId) => {
        try {

            const response = await axios.post("http://10.0.2.2:5000/auth/user/friend-request", {
                currentUserId: currentUserId, selectedUserId: selectedUserId,
            });

            if (response.data.success) {
                setRequestSent(true);
            }

        } catch (error) {
            console.log("error message", error);
        }
    };

    return (
        <Pressable style={{ flexDirection: "row", alignItems: "center", marginVertical: 3, backgroundColor: "orange", padding: 5, borderRadius: 10 }}>

            <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <Text style={{ color: "white", fontSize: 20 }}>{item?.username[0].toUpperCase()}</Text>
            </View>
            <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={{ fontWeight: "bold" }}>{item?.username}</Text>
                <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
            </View>
            {userFriends.includes(item._id) ? (
                <Pressable
                    style={{
                        backgroundColor: "#82CD47",
                        padding: 10,
                        width: 105,
                        borderRadius: 6,
                    }}
                >
                    <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
                </Pressable>
            ) : (
                (requestSent || friendRequest.some((ele) => ele._id === item._id)) ?
                    <Pressable
                        style={{
                            backgroundColor: "gray",
                            padding: 10,
                            width: 105,
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                            Request Sent
                        </Text>
                    </Pressable> : <Pressable
                        onPress={() => sendFriendRequest(userId, item._id)}
                        style={{
                            backgroundColor: "#567189",
                            padding: 10,
                            borderRadius: 6,
                            width: 105,
                        }}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
                            Add Friend
                        </Text>
                    </Pressable>
            )
            }

        </Pressable>
    );
}

export default User

const styles = StyleSheet.create({})