import {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Logo from '../Logo';
import {
  actionDanger,
  actionPositive,
  backgroundDark,
  backgroundLight,
  mainLight,
} from '../styles/styles';

import {employeeContext, WorkTimeModel} from '../realm';
const {useQuery, useRealm} = employeeContext;

type StartWorkProps = {
  navigation: any;
  route: any;
};

export default function StartWork({
  navigation,
  route,
}: StartWorkProps): JSX.Element {
  const workHours = useQuery(WorkTimeModel);
  const realm = useRealm();
  const {employee} = route.params;
  const {pin, isWorking} = employee;

  const textInStartButton = isWorking ? 'Kończę pracę' : 'Rozpoczynam pracę';
  const actionButtonBackgroundColor = isWorking ? actionDanger : actionPositive;

  const startWork = useCallback(() => {
    const newStartWorkTime = {
      _id: new Realm.BSON.ObjectId(),
      pin,
      startWork: new Date(),
      endWork: null,
    };
    realm.write(() => {
      const workDay = realm.create('Workdays', newStartWorkTime);
      employee.isWorking = true;
      employee.workDays.push(workDay);
    });
  }, [realm, employee, pin]);

  const endWork = useCallback(() => {
    const currentWorkday = workHours.filtered(
      `pin = "${pin}" AND endWork = null`,
    )[0];
    if (currentWorkday) {
      realm.write(() => {
        currentWorkday.endWork = new Date();
        employee.isWorking = false;
      });
    }
  }, [realm, employee, pin, workHours]);

  const startEndWorkHandler = () => {
    navigation.navigate('Greetings', {
      employee,
    });
    if (employee.isWorking) {
      endWork();
    } else {
      startWork();
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.nameTextContainer}>
        <Text style={styles.text}>
          {employee?.name} {employee?.surname}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.startWorkContainer,
          {backgroundColor: actionButtonBackgroundColor},
        ]}
        onPress={startEndWorkHandler}>
        <Text style={styles.startWorkText}>{textInStartButton}</Text>
      </TouchableOpacity>
      <View style={styles.backHomeContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={60} color="white" />
        </TouchableOpacity>
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
