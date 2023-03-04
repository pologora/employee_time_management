/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable global-require */
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';

import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import Keypad from '../components/Keypad';
import Logo from '../components/Logo';
import { mainLight, backgroundDark, backgroundLight } from '../styles/Styles';

export default function Home({ navigation }) {
  const [pin, setPin] = useState(null);
  const [time, setTime] = useState(new Date());

  const dniTygodnia = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ];

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const hour = time.getHours();
  const min = time.getMinutes();
  const day = time.getDay();
  const dayOfTheMonth = time.getDate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 6000);

    return () => clearInterval(interval);
  }, []);
  const handlePinChange = (newPin) => {
    setPin(newPin);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundDark,
      alignItems: 'center',
      justifyContent: 'flex-end',
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
      marginVertical: 20,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
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
    dateHours: {
      color: mainLight,
      fontSize: 26,
      alignSelf: 'flex-end',
    },
    dateFull: { color: mainLight, fontSize: 18 },
    dateOfWeek: { color: mainLight, alignSelf: 'flex-end', fontSize: 16 },
    listaObecnosci: {
      color: mainLight,
      marginBottom: 10,
    },
  });

  return (
    <>
      <StatusBar backgroundColor="white" />
      <View style={styles.container}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateHours}>
            {`${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}`}
          </Text>
          <Text style={styles.dateFull}>
            {`${dayOfTheMonth < 10 ? `0${dayOfTheMonth}` : dayOfTheMonth}.${
              month < 10 ? `0${month}` : month
            }.${year}`}
          </Text>
          <Text style={styles.dateOfWeek}>{dniTygodnia[day]}</Text>
        </View>
        <Logo />
        <View style={styles.nameTextContainer}>
          <Text style={styles.pinText} />
        </View>
        <View style={styles.nameTextContainer}>
          <Text style={styles.pinText}>{pin ? `${pin}` : 'Wpisz PIN'}</Text>
        </View>
        <View>
          <Keypad onPinChange={handlePinChange} navigation={navigation} />
        </View>
        <TouchableOpacity
          style={styles.keypadButton}
          onPress={() => navigation.navigate('EmployeesList')}
        >
          <Text style={styles.listaObecnosci}>Lista obecności</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
