import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
    const BaseUrl = "http://localhost:5000";
    const navigation = useNavigation();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const handleOnchange = (text, input) => {
        setFormData(prevState => ({ ...prevState, [input]: text }));
    };
    const handleSubmit = async () => {
        console.log(formData);
        await axios.post("http://10.0.2.2:5000/auth/register", formData).then((response) => {
            console.log(response);
            Alert.alert(
                "Registration successful",
                "You have been registered Successfully"
            );
            navigation.navigate("Login");
        }).catch((error) => {
            Alert.alert(
                "Registration Error",
                "An error occurred while registering"
            );
            console.log("registration failed", error);
        });
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "lightgreen", alignItems: "center", flexDirection: "column", justifyContent: "center", margin: 1 }} >
            <KeyboardAvoidingView >

                {/* heading */}
                <Text style={{ fontWeight: "bold", fontSize: 25, alignSelf: "center", paddingBottom: 25 }}>Welcome💫</Text>


                {/* input fields */}
                <Text style={{ fontSize: 20, padding: 2 }}>Username</Text>
                <TextInput placeholder='username'
                    onChangeText={(text) => handleOnchange(text, 'username')} style={{ fontSize: 20, paddingBottom: 2, borderBottomWidth: .5, height: 40 }}></TextInput>

                <Text style={{ fontSize: 20, padding: 2 }}>Email</Text>
                <TextInput onChangeText={(text) => handleOnchange(text, 'email')} placeholder='email' value={formData.email} style={{ fontSize: 20, paddingBottom: 2, borderBottomWidth: .5, height: 40 }}></TextInput>

                <Text style={{ fontSize: 20, padding: 2 }}>Password</Text>
                <TextInput onChangeText={(text) => handleOnchange(text, 'password')} placeholder='password' value={formData.password} style={{ fontSize: 20, paddingBottom: 2, borderBottomWidth: .5, height: 40 }}></TextInput>
                {/* detail */}
                <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20 }}>
                    <Text style={{ color: "gray" }}>Already have an account? </Text><TouchableOpacity onPress={() => navigation.navigate("Login")}><Text style={{ color: "blue", fontWeight: "700", fontSize: 18 }}>Login</Text></TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={{ backgroundColor: "orange", alignItems: "center", borderRadius: 8, height: 35 }}><Text onPress={handleSubmit} style={{ fontSize: 22 }}>Register</Text></TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})