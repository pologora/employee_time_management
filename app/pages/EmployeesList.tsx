import {StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Employee from '../Employee';
import Logo from '../Logo';
import {backgroundDark, backgroundLight} from '../styles/styles';

import {employeeContext, EmployeeModel, WorkTimeModel} from '../realm';

type EmployeesListProps = {
  navigation: any;
  route: any;
};

export default function EmployeesList({navigation}: EmployeesListProps) {
  const {useQuery} = employeeContext;
  const employeesAll = useQuery(EmployeeModel);
  const employees = employeesAll.filtered('isWorking=true');

  const listEployeesItem = employees?.map((item: EmployeeModel) => (
    <Employee item={item} key={item.pin} />
  ));

  return (
    <View style={styles.container}>
      <Logo />
      <ScrollView style={styles.listContainer}>{listEployeesItem}</ScrollView>
      <View style={styles.backHomeContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  backHomeContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  container: {
    flex: 1,
    backgroundColor: backgroundDark,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listContainer: {
    backgroundColor: backgroundLight,
    flex: 1,
    width: '80%',
    marginBottom: 100,
    marginTop: 130,
  },
});
