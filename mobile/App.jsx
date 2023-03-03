/* eslint-disable linebreak-style */
/* eslint-disable global-require */
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StartWork from './StartWork';
import Home from './Home';
import EmployeesList from './EmployeesList';
import Greetings from './Greetings';

export default function App() {
  // const [pin, setPin] = useState(null);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartWork" component={StartWork} />
        <Stack.Screen name="EmployeesList" component={EmployeesList} />
        <Stack.Screen name="Greetings" component={Greetings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
