import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserType } from '../UserContext';
import axios from 'axios';
import FriendRequest from '../components/friendrequest';
const FriendsScreen = () => {
    const { userId, setUserId } = useContext(UserType);
    const [requests, setRequests] = useState([]);
    const fetchFriendRequest = async () => {
        const res = await axios.get(`http://10.0.2.2:5000/auth/user/all-friend-request/${userId}`);
        // console.log(res.data.data);
        if (res.data.success) {
            setRequests(res.data.data);
        }
    }
    useEffect(() => {
        fetchFriendRequest();
    }, []);

    return (
        <View style={{ padding: 10, marginHorizontal: 12 }}>
            {requests.length > 0 && <Text>New Friend Requests</Text>}

            {requests.map((item, index) => (
                <FriendRequest
                    key={index}
                    item={item}
                    friendRequests={requests}
                    setFriendRequests={setRequests}
                />
            ))}
        </View>
    )
}

export default FriendsScreen

const styles = StyleSheet.create({})