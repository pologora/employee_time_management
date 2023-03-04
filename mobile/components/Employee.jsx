/* eslint-disable react/prop-types */
import { StyleSheet, Text, View } from 'react-native';
import { actionDanger, actionPositive } from '../styles/Styles';

export default function Employee({
  item: {
    name, surname, pin, isWorking,
  },
}) {
  const workTimeColor = isWorking ? actionPositive : 'gray';

  const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
    },
  });
  return (
    <View style={styles.itemContainer}>
      <Text>
        {name}
        {' '}
        {surname}
      </Text>
      <Text style={{ color: workTimeColor }}>{isWorking ? 'pracuje' : 'nie pracuje'}</Text>
    </View>
  );
}
