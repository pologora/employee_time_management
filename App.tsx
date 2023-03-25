/**
 *
 * @format
 */
import NetInfo from '@react-native-community/netinfo';
import {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {AppProvider, UserProvider} from '@realm/react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EmployeesList from './app/pages/EmployeesList';
import Home from './app/pages/Home';
import StartWork from './app/pages/StartWork';
import Greetings from './app/pages/Greetings';
import {employeeContext} from './app/realm';
import Login from './app/Login';

const {RealmProvider} = employeeContext;

function App(): JSX.Element {
  const [internetConnected, setInternetConnected] = useState(false);
  const {useRealm} = employeeContext;
  const realm = useRealm();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const offline = !!(state.isConnected && state.isInternetReachable);
      setInternetConnected(offline);
      console.log(offline);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (internetConnected) {
      realm.syncSession?.resume();
      console.log('start internet');
    } else {
      realm.syncSession?.pause();
      console.log('stop internet');
    }
  }, [internetConnected, realm.syncSession]);

  realm.subscriptions.update(subs => {
    subs.add(realm.objects('Employee'), {
      name: 'EmployeeSubscription',
    });
    subs.add(realm.objects('Workdays'), {
      name: 'WorkdaysSubscription',
    });
  });

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" />
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="StartWork" component={StartWork} />
        <Stack.Screen name="EmployeesList" component={EmployeesList} />
        <Stack.Screen name="Greetings" component={Greetings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function AppWrapper() {
  const OpenRealmBehaviorConfiguration: Realm.OpenRealmBehaviorConfiguration = {
    type: 'openImmediately',
  };

  return (
    <AppProvider id="test-hbegu" baseUrl="https://realm.mongodb.com">
      <UserProvider fallback={Login}>
        <RealmProvider
          sync={{
            flexible: true,
            newRealmFileBehavior: OpenRealmBehaviorConfiguration,
            existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
          }}>
          <App />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}

export default AppWrapper;
