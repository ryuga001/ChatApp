import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginScreen = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const handleOnchange = (text, input) => {
        setFormData(prevState => ({ ...prevState, [input]: text }));
    };
    const handleSubmit = async () => {
        console.log(formData);
        const res = await axios.post("http://10.0.2.2:5000/auth/login", formData);
        if (res.data.success) {
            AsyncStorage.setItem("token", res.data.token);
            Alert.alert(`${res.data.message}`);
            navigation.replace("Home");
        }
        console.log(res);
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    navigation.navigate("Home");
                }
            } catch (error) {
                console.log("error in checklogin ", error);
            }
        }
        checkLogin();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "lightgreen", alignItems: "center", flexDirection: "column", justifyContent: "center", margin: 1 }} >
            <KeyboardAvoidingView >

                {/* heading */}
                <Text style={{ fontWeight: "bold", fontSize: 25, alignSelf: "center", paddingBottom: 25 }}>Welcome </Text>


                {/* input fields */}

                <Text style={{ fontSize: 20, padding: 2 }}>Email</Text>
                <TextInput onChangeText={(text) => handleOnchange(text, 'email')} placeholder='email' value={formData.email} style={{ fontSize: 20, paddingBottom: 2, borderBottomWidth: .5, height: 40 }}></TextInput>

                <Text style={{ fontSize: 20, padding: 2 }}>Password</Text>
                <TextInput onChangeText={(text) => handleOnchange(text, 'password')} placeholder='password' value={formData.password} style={{ fontSize: 20, paddingBottom: 2, borderBottomWidth: .5, height: 40 }}></TextInput>
                {/* detail */}
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20 }}>
                    <Text style={{ color: "gray" }}>Don't have an account? </Text><TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={{ color: "blue", fontWeight: "700", fontSize: 18 }}>Register</Text></TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: "orange", alignItems: "center", borderRadius: 8, height: 35 }}><Text onPress={handleSubmit} style={{ fontSize: 22 }}>Login</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})