import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Logo from '../Logo';
import {backgroundDark, backgroundLight} from '../styles/styles';
import {useCallback, useEffect, useState} from 'react';

import {employeeContext, EmployeeModel, BreakModel} from '../realm';
import {getLocalTime} from '../helpers/dateHelpers';

type EmployeesListProps = {
  navigation: any;
  route: any;
};

type breakListItem = {
  employee: EmployeeModel;
  breakDuration: number;
  startTime: Date;
};

export default function EmployeesOnBreak({
  navigation,
  route,
}: EmployeesListProps) {
  const [breaksList, setBreaksList] = useState<Array<breakListItem> | null>(
    null,
  );
  const {useQuery} = employeeContext;
  const employeesAll = useQuery(EmployeeModel);
  const breaks = useQuery(BreakModel);
  const ongoingBreaks = breaks.filtered('endBreak = $0', null);

  const {defaultBreakDuration} = route.params;

  const getBreakList = useCallback(() => {
    const breakList: Array<breakListItem> = [];

    const localDateTime = getLocalTime();

    ongoingBreaks.forEach((item: BreakModel) => {
      const employee = employeesAll.find((employee: EmployeeModel) =>
        employee._id.equals(item.employeeId),
      );
      if (employee) {
        const breakDuration =
          localDateTime.getTime() - item.startBreak.getTime();
        breakList.push({employee, breakDuration, startTime: item.startBreak});
      }
    });

    setBreaksList(breakList);
  }, [ongoingBreaks, employeesAll]);

  const updateBreakList = () => {
    const localDateTime = getLocalTime();

    setBreaksList(currentList => {
      if (!currentList) {
        return null;
      }

      return currentList.map(item => {
        return {
          ...item,
          breakDuration:
            localDateTime.getTime() - new Date(item.startTime).getTime(),
        };
      });
    });
  };

  useEffect(() => {
    getBreakList();
    const id = setInterval(updateBreakList, 1000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listEployeesItem = breaksList?.map(item => {
    const {name, surname, _id} = item.employee;
    const durationTimeColor =
      Math.floor((item.breakDuration / (1000 * 60)) % 60) > defaultBreakDuration
        ? 'red'
        : 'black';
    const duration = formatDuration(item.breakDuration);
    return (
      <View key={_id.toString()} style={styles.listItemContainer}>
        <Text style={styles.listItemName}>
          {name} {surname}
        </Text>
        <Text style={{color: durationTimeColor}}>{`(${duration})`}</Text>
      </View>
    );
  });

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

function formatDuration(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const hoursDisplay = hours > 0 ? `${hours}h ` : '';
  const minutesDisplay = minutes > 0 ? `${minutes}min ` : '0min ';
  const secondsDisplay = seconds > 0 ? `${seconds}s` : '00s';

  return hoursDisplay + minutesDisplay + secondsDisplay;
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
  listItemName: {
    color: 'black',
    marginRight: 5,
  },
  listItemContainer: {
    flexDirection: 'row',
    margin: 5,
  },
});
