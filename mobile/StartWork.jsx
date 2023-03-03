/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  Button, Image, StyleSheet, Text, TouchableOpacity, View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Logo from './Logo';
import {
  actionDanger, actionPositive, backgroundDark, backgroundLight, mainLight,
} from './Styles';

export default function StartWork({ navigation }) {
  const [isWorking, setIsworking] = useState(false);

  const textInStartButton = isWorking ? 'Kończę pracę' : 'Rozpoczynam pracę';
  const actionButtonBackgroundColor = isWorking ? actionDanger : actionPositive;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundDark,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    nameTextContainer: {
      backgroundColor: backgroundLight,
      width: '80%',
      marginTop: '50%',
      padding: 0,
    },
    text: {
      marginVertical: 20,
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    backHomeContainer: {
      position: 'absolute',
      bottom: 20,
      left: 20,
    },
    startWorkContainer: {
      backgroundColor: actionButtonBackgroundColor,
      borderRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 20,
      width: '80%',
      marginTop: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    startWorkText: {
      color: mainLight,
      fontWeight: 'bold',
      fontSize: 18,
      textTransform: 'uppercase',
    },
  });

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.nameTextContainer}>
        <Text style={styles.text}>Agnieszka Wojtyła</Text>
      </View>
      <TouchableOpacity
        style={styles.startWorkContainer}
        onPress={() => navigation.navigate('Greetings')}
      >
        <Text style={styles.startWorkText}>{textInStartButton}</Text>
      </TouchableOpacity>
      <View style={styles.backHomeContainer}>
        <TouchableOpacity style={styles.backHomeIcon} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
