import { StyleSheet, Text } from 'react-native';
import StackNavigator from './StackNavigator';
import { UserContext } from './UserContext';

export default function App() {
  return (
    <UserContext>
      <StackNavigator />
    </UserContext>
  );
}

const styles = StyleSheet.create({

});
