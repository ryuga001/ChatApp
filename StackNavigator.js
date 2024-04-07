import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet } from 'react-native'
import LoginScreen from './screens/loginscreen'
import RegisterScreen from './screens/registerscreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homescreen';
import FriendsScreen from './screens/friendsscreen';
import ChatScreen from './screens/chatscreen';
import ChatMessagesScreen from './screens/chatmessagescreen';
const Stack = createNativeStackNavigator();
export default function StackNavigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="Login" component={LoginScreen}
                    options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Register" component={RegisterScreen}
                    options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>

                <Stack.Screen name="Friends" component={FriendsScreen} />
                <Stack.Screen name="Chats" component={ChatScreen} />
                <Stack.Screen name="Messages" component={ChatMessagesScreen} />
            </Stack.Navigator>

        </NavigationContainer>
    )
}

