import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {mainLight} from './styles/styles';

const Clock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

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

  return (
    <View style={styles.clock}>
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
  );
};

const styles = StyleSheet.create({
  clock: {
    color: 'white',
    fontSize: '20',
    alignSelf: 'flex-end',
  },
  dateHours: {
    color: mainLight,
    fontSize: 22,
    alignSelf: 'flex-end',
  },
  dateFull: {color: mainLight, fontSize: 18},
  dateOfWeek: {color: mainLight, alignSelf: 'flex-end', fontSize: 16},
});

export default Clock;
