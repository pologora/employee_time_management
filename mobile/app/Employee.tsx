import {StyleSheet, Text, View} from 'react-native';
import {actionPositive} from './styles/styles';
import {EmployeeModel} from './realm';

type EmployeeProps = {
  item: EmployeeModel;
};

export default function Employee({item}: EmployeeProps): JSX.Element {
  const {name, surname, isWorking} = item;
  const workTimeColor = isWorking ? actionPositive : 'gray';

  return (
    <View style={styles.itemContainer}>
      <Text
        style={{
          color: workTimeColor,
        }}>
        {name} {surname}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
});
