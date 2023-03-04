/* eslint-disable linebreak-style */
/* eslint-disable global-require */
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Realm from 'realm';
import StartWork from './screens/StartWork';
import Home from './screens/Home';
import EmployeesList from './screens/EmployeesList';
import Greetings from './screens/Greetings';

const app = new Realm.App({ id: 'test-hbegu' });

export default function App() {
  // const [pin, setPin] = useState(null);

  // const employeeData = {
  //   name: 'John',
  //   surname: 'Doe',
  //   pin: '1234',
  //   isWorking: false,
  // };

  // realm.write(() => {
  //   realm.create('Employee', employeeData);
  // });

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
