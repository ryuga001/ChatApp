import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const UserChat = ({ item }) => {
    const { userId, setUserId } = useContext(UserType);
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const fetchMessages = async () => {
        try {
            const res = await axios.get(`http://10.0.2.2:5000/msg/messages/${userId}/${item._id}`);

            if (res.data.success) {
                setMessages(res.data.data);
            } else {
                console.log(res.data.message);
            }
        } catch (error) {
            console.log("error fetching messages", error);
        }
    }

    const lastMessage = messages[messages.length - 1];
    const formatTime = (time) => {
        const options = { hour: "numeric", minute: "numeric" };
        return new Date(time).toLocaleString("en-US", options);
    };
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <Pressable
            onPress={() =>
                navigation.navigate("Messages", {
                    recepientId: item._id,
                })
            }
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                borderWidth: 0.7,
                borderColor: "#D0D0D0",
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                padding: 10,
            }}
        >
            <View
                style={{ width: 50, height: 50, borderRadius: 50, backgroundColor: "purple", alignItems: "center", justifyContent: "center" }}
            >
                <Text style={{ color: "white", fontSize: 22 }}>{item?.username[0].toUpperCase()}</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>{item?.username}</Text>
                {lastMessage && (
                    <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
                        {lastMessage.messageType === "text" ? lastMessage?.message : "Image"}
                    </Text>
                )}
            </View>

            <View>
                <Text style={{ fontSize: 11, fontWeight: "400", color: "#585858" }}>
                    {lastMessage && formatTime(lastMessage?.timeStamp)}
                </Text>
            </View>
        </Pressable>
    )
}

export default UserChat

const styles = StyleSheet.create({})