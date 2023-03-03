/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Logo from './Logo';
import { backgroundDark, backgroundLight } from './Styles';

export default function Greetings({ navigation }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 1200);

    return () => clearTimeout(timeout);
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: backgroundDark,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    actionContainer: {
      width: '80%',
      backgroundColor: backgroundLight,
      flex: 1,
      marginVertical: 200,
      alignItems: 'center',
      borderRadius: 10,
    },
    text: {
      fontSize: 26,
    },
    name: {
      marginVertical: 40,
    },
    action: {
      marginVertical: 20,
      fontSize: 20,
      textTransform: 'uppercase',
    },
    time: {
      fontWeight: 'bold',
      fontSize: 40,
    },
  });
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.actionContainer}>
        <Text style={[styles.text, styles.name]}>Imię Nazwisko</Text>
        <Text style={[styles.text, styles.action]}>Rozpoczynasz pracę</Text>
        <Text style={[styles.text, styles.time]}>12:00</Text>
      </View>
    </View>
  );
}
