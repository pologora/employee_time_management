import {useEffect, useState} from 'react';
import notifee from '@notifee/react-native';
import BackgroundTimer from 'react-native-background-timer';

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
  backgroundDark,
  backgroundLight,
  mainDark,
  mainLight,
} from '../styles/styles';
import {employeeContext, EmployeeModel, AdminSettingsModel} from '../realm';
import Clock from '../Clock';
import Icon from 'react-native-vector-icons/Ionicons';
import {WorkActions} from './StartWork';

type HomeProps = {
  navigation: any;
  syncStatus: string;
  route: any;
};

type AlertIdListItem = {
  id: number;
  name: string;
  surname: string;
};

export default function Home({
  navigation,
  syncStatus,
  route,
}: HomeProps): JSX.Element {
  const {useQuery} = employeeContext;
  const [pin, setPin] = useState<string>('');
  const [employee, setEmployee] = useState<EmployeeModel | undefined>(
    undefined,
  );
  const [alertsIdList, setAlertsIdList] = useState<Array<AlertIdListItem>>([]);
  console.log(alertsIdList);

  const action = route.params?.action || null;

  let adminSettings = useQuery(AdminSettingsModel)[0];
  // const realm = useRealm();
  // if (!adminSettings) {
  //   realm.write(() => {
  //     adminSettings = realm.create('AdminSettings', {});
  //   });
  // }

  useEffect(() => {
    function startBrekAlertTimeout(
      timeInMin: number,
      name: string,
      surname: string,
    ) {
      const id = BackgroundTimer.setTimeout(() => {
        displayNotification(
          `${name} ${surname}`,
          `Znajduje się na przerwie powyżej ${timeInMin} minut`,
        );
        clearIdAndIdList(id);
      }, timeInMin * 1000 * 60);

      setAlertsIdList(prev => {
        return [...prev, {id, name, surname}];
      });
    }

    if (action === WorkActions.StartBreak) {
      const {name, surname} = route.params;
      startBrekAlertTimeout(adminSettings.defaultBreakDuration, name, surname);
    } else if (
      action === WorkActions.EndBreak ||
      action === WorkActions.EndWork
    ) {
      const {name, surname} = route.params;
      const id = alertsIdList?.find(
        item => item.name === name && item.surname === surname,
      )?.id;
      clearIdAndIdList(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);

  function clearIdAndIdList(id: number | undefined) {
    if (id) {
      BackgroundTimer.clearTimeout(id);
      if (alertsIdList.length) {
        setAlertsIdList(prev => {
          const newArray = prev.filter(item => item.id !== id);
          return [...newArray];
        });
      }
    }
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
    navigation.navigate('BreaksList', {
      defaultBreakDuration: adminSettings.defaultBreakDuration,
    });
  };

  async function displayNotification(title: string, body: string) {
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      sound: 'alert-1',
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

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
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleGoToList}>
            <Text style={styles.listaObecnosci}>Obecność</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBreaksList}>
            <Text style={styles.listaObecnosci}>Przerwy</Text>
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

    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});
