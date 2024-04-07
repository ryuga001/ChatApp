import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserType } from '../UserContext';
import User from "../components/user";
import { io } from "socket.io-client";
const HomeScreen = () => {
    const ENDPOINT = "http://10.0.2.2:5000";

    const { userId, setUserId } = useContext(UserType);
    const [user, setUser] = useState();
    const [AllUser, setAllUser] = useState([]);
    const navigation = useNavigation();
    const fetchUsers = async () => {
        const token = await AsyncStorage.getItem("token");

        axios.post("http://10.0.2.2:5000/auth/currentUser", {
            token: token
        }).then((res) => {

            setUserId(res.data.data._id);
        }).catch((err) => {
            console.log(err);
        });


        await axios.get(`http://10.0.2.2:5000/auth/users/${userId}`).then((res) => {

            setAllUser(res.data.data);
        }).catch((error) => {
            console.log("error retrieving users", error);
        });
    }
    useEffect(() => {

        const socket = io(ENDPOINT, { transports: ['websocket'] });
        fetchUsers();;

    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerLeft: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>WeChat</Text>
            ),
            headerRight: () => (
                <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                    <Ionicons onPress={() => navigation.navigate("Chats")} name="chatbox-ellipses-outline" size={24} color="black" />
                    <MaterialIcons
                        onPress={() => navigation.navigate("Friends")}
                        name="people-outline"
                        size={24}
                        color="black"
                    />
                    <MaterialIcons
                        onPress={() => {
                            AsyncStorage.removeItem("token");
                            navigation.replace("Login");
                        }}
                        name="logout" size={24} color="black" />
                </View>
            ),
        })
    }, []);


    return (
        <View style={{ backgroundColor: "#C6EBC5", minHeight: "100%" }}>
            <View style={{ padding: 10 }}>
                {AllUser.map((item, index) => (
                    <User key={index} item={item} />

                ))}
            </View>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})