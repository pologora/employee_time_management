import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Logo from '../Logo';
import {backgroundDark, backgroundLight, mainDark} from '../styles/styles';

type GreetingsProps = {
  navigation: any;
  route: any;
};

export default function Greetings({
  navigation,
  route,
}: GreetingsProps): JSX.Element {
  const {employee} = route.params;
  const currentTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const [time] = useState<String>(currentTime);

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('Home');
    }, 1300);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.actionContainer}>
        <Text style={[styles.text, styles.name]}>
          {employee.name} {employee.surname}
        </Text>
        <Text style={[styles.text, styles.action]}>
          {employee.isWorking ? 'Rozpoczynasz pracę' : 'Kończysz pracę'}
        </Text>
        <Text style={[styles.text, styles.time]}>{time}</Text>
      </View>
    </View>
  );
}
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
    marginVertical: '40%',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 26,
    color: mainDark,
  },
  name: {
    marginVertical: '10%',
    textTransform: 'capitalize',
  },
  action: {
    marginVertical: 20,
    fontSize: 20,
    textTransform: 'uppercase',
  },
  time: {
    fontWeight: 'bold',
    fontSize: 40,
    color: mainDark,
  },
});
