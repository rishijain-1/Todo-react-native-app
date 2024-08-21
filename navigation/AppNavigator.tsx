import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/Register';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home'; 


// Define the type for stack navigator
export type RootStackParamList = {
  RegisterScreen: undefined;
  LoginScreen:undefined;
  HomeScreen:undefined;
  // Add other screens as needed
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
