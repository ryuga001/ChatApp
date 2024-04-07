import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import UserChat from '../components/userchat';

const ChatScreen = () => {
    const [friends, setFriends] = useState([]);
    const { userId, setUserId } = useContext(UserType);
    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`http://10.0.2.2:5000/auth/user/accepted-friends/${userId}`);
                if (res.data.success) {
                    setFriends(res.data.data);
                }
            } catch (error) {
                console.log("error in showing friends", error);
            }
        }
        fetchFriends();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable>
                {
                    friends.map((item, index) => {
                        return <UserChat key={index} item={item} />
                    })
                }
            </Pressable>
        </ScrollView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})