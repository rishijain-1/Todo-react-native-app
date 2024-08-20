import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from '../screens/Register'; 


// Define the type for stack navigator
export type RootStackParamList = {
  RegisterScreen: undefined;
  
  // Add other screens as needed
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="RegisterScreen">
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Register' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
