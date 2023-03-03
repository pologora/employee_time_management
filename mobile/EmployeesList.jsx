/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
  StyleSheet, TouchableOpacity, View, ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Employee from './Employee';
import Logo from './Logo';
import { backgroundDark, backgroundLight } from './Styles';
import employeeList from './employeesList';

export default function EmployeesList({ navigation }) {
  const [employees, setEmployees] = useState(employeeList);

  const listEployeesItem = employees.map((item) => <Employee item={item} key={item.pin} />);

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
  return (
    <View style={styles.container}>
      <Logo />
      <ScrollView style={styles.listContainer}>{listEployeesItem}</ScrollView>
      <View style={styles.backHomeContainer}>
        <TouchableOpacity style={styles.backHomeIcon} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={60} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
