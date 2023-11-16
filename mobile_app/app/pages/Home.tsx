import {useEffect, useState} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Keypad from '../Keypad';
import Logo from '../Logo';
import {
  mainLight,
  backgroundDark,
  backgroundLight,
  mainDark,
} from '../styles/styles';
import {employeeContext, EmployeeModel, AdminSettingsModel} from '../realm';
import Clock from '../Clock';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeProps = {
  navigation: any;
  syncStatus: string;
};

export default function Home({navigation, syncStatus}: HomeProps): JSX.Element {
  const {useQuery, useRealm} = employeeContext;
  const [pin, setPin] = useState<string>('');
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined,
  );
  const realm = useRealm();

  let adminSettings = useQuery(AdminSettingsModel)[0];

  if (!adminSettings) {
    realm.write(() => {
      adminSettings = realm.create('AdminSettings', {});
    });
  }

  const employeesAll = useQuery(EmployeeModel);

  const handlePinChange = (newPin: string) => {
    setPin(newPin);
  };

  const handleAcceptButton = () => {
    if (employee) {
      navigation.navigate('StartWork', {
        employee,
        adminSettings,
      });
    } else {
      return;
    }
  };

  useEffect(() => {
    if (pin?.length > 2) {
      const employeeActive = employeesAll.find(item => item.pin === pin);
      setEmployee(employeeActive);
    }
    return () => {
      setEmployee(undefined);
    };
  }, [pin, employeesAll]);

  const handleGoToList = () => {
    navigation.navigate('EmployeesList');
  };

  const handleBreaksList = () => {
    navigation.navigate('BreaksList');
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.syncStatus}>
          <Icon
            name="ellipse"
            size={15}
            color={
              syncStatus === 'success'
                ? 'green'
                : syncStatus === 'retrying'
                ? 'yellow'
                : syncStatus === 'failed'
                ? 'red'
                : 'gray'
            }
          />
        </View>
        <StatusBar
          animated={true}
          backgroundColor="black"
          showHideTransition={'none'}
        />
        <View style={styles.dateContainer}>
          <Clock />
        </View>
        <Logo />
        <View style={styles.nameTextContainer}>
          <Text style={styles.pinText}>
            {employee?.name} {employee?.surname}
          </Text>
        </View>
        <View style={styles.nameTextContainer}>
          <Text style={styles.pinText}>{pin ? `${pin}` : 'Wpisz PIN'}</Text>
        </View>
        <View>
          <Keypad
            onPinChange={handlePinChange}
            handleAcceptButton={handleAcceptButton}
          />
        </View>
        <View>
          <TouchableOpacity onPress={handleGoToList}>
            <Text style={styles.listaObecnosci}>Lista obecności</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBreaksList}>
            <Text style={styles.listaObecnosci}>Lista przerw</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundDark,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  syncStatus: {
    position: 'absolute',
    top: '3%',
    left: '3%',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: '10%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: backgroundLight,
    gap: 10,
  },
  dateContainer: {
    position: 'absolute',
    top: '8%',
    right: '10%',
    alignItems: 'flex-start',
  },
  pinText: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: mainDark,
  },
  keypadView: {
    alignItems: 'center',
  },
  nameTextContainer: {
    backgroundColor: backgroundLight,
    width: '80%',
    marginTop: 5,
    padding: 0,
  },
  listaObecnosci: {
    color: mainLight,
    marginBottom: 10,
  },
  buttonsContainer: {},
});
