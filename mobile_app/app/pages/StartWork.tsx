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

export enum WorkActions {
  StartWork,
  EndWork,
  StartBreak,
  EndBreak,
}

import {BreakModel, employeeContext, WorkTimeModel} from '../realm';
import {getBoundaryTime, getLocalTime} from '../helpers/dateHelpers';
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
  const breaks = useQuery(BreakModel);

  const realm = useRealm();
  const {employee, adminSettings} = route.params;
  const {isWorking, _id: id} = employee;
  const {defaultBreakDuration, maxBreaksPerDay} = adminSettings;
  const currentBreak = breaks.filtered(
    'employeeId = $0 AND endBreak = null',
    id,
  )[0];

  const textInStartButton = isWorking ? 'Kończę pracę' : 'Rozpoczynam pracę';
  const actionButtonBackgroundColor = isWorking ? actionDanger : actionPositive;
  const breakButtonText = currentBreak
    ? 'Koniec przerwy'
    : `Przerwa ${defaultBreakDuration} min`;
  const breaksLeft = maxBreaksPerDay - getCurrentWorkDayBreaks();
  const breakButtonBgColor =
    breaksLeft <= 0 && !currentBreak
      ? 'gray'
      : currentBreak
      ? actionDanger
      : actionPositive;
  const breaksLeftText = `Pozostało przerw: ${breaksLeft}`;

  function getCurrentWorkDayBreaks() {
    const localTime = getLocalTime();
    const hours = localTime.getHours();
    let todayBreaks = null;

    const startOfDay = getBoundaryTime(8);
    const startOfNightShift = getBoundaryTime(22);

    if (hours >= 9 && hours < 19) {
      todayBreaks = breaks.filtered(
        'employeeId = $0 AND startBreak > $1',
        id,
        startOfDay,
      );
    } else if (hours >= 22) {
      todayBreaks = breaks.filtered(
        'employeeId = $0 AND startBreak > $1',
        id,
        startOfNightShift,
      );
    } else if (hours < 9) {
      const startOfPreviousNightShift = new Date(startOfNightShift);
      startOfPreviousNightShift.setDate(
        startOfPreviousNightShift.getDate() - 1,
      );

      todayBreaks = breaks.filtered(
        'employeeId = $0 AND startBreak >= $1',
        id,
        startOfPreviousNightShift,
      );
    }

    return todayBreaks?.length || 0;
  }

  const breakHandler = () => {
    navigation.navigate('Greetings', {
      employee,
      action: currentBreak ? WorkActions.EndBreak : WorkActions.StartBreak,
    });
    if (currentBreak) {
      endBreak();
    } else {
      startBreak();
    }
  };

  const startEndWorkHandler = () => {
    navigation.navigate('Greetings', {
      employee,
      action: employee.isWorking ? WorkActions.EndWork : WorkActions.StartWork,
    });
    if (employee.isWorking) {
      endWork();
    } else {
      startWork();
    }
  };
  const endBreak = useCallback(() => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const localDateTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
    if (currentBreak) {
      realm.write(() => {
        currentBreak.endBreak = localDateTime;
      });
    }
  }, [realm, currentBreak]);

  const startWork = useCallback(() => {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const localDateTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
    const newStartWorkTime = {
      _id: new Realm.BSON.ObjectId(),
      employeeId: id,
      startWork: localDateTime,
      endWork: null,
    };
    realm.write(() => {
      realm.create('Workdays', newStartWorkTime);
      employee.isWorking = true;
    });
  }, [realm, employee, id]);

  const endWork = useCallback(() => {
    const currentWorkday = workHours.filtered(
      'employeeId = $0 AND endWork = null',
      id,
    )[0];
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const localDateTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
    if (currentWorkday) {
      realm.write(() => {
        currentWorkday.endWork = localDateTime;
        employee.isWorking = false;
      });
    }
    endBreak();
  }, [realm, employee, id, workHours, endBreak]);

  function startBreak() {
    const now = new Date();
    const timezoneOffset = now.getTimezoneOffset();
    const localDateTime = new Date(now.getTime() - timezoneOffset * 60 * 1000);
    const breakStartTime = {
      _id: new Realm.BSON.ObjectId(),
      employeeId: id,
      startBreak: localDateTime,
      endBreak: null,
    };
    realm.write(() => {
      realm.create('Break', breakStartTime);
    });
  }

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.nameTextContainer}>
        <Text style={styles.text}>
          {employee?.name} {employee?.surname}
        </Text>
        {isWorking && (
          <Text style={styles.breaksLeftText}>{breaksLeftText}</Text>
        )}
      </View>
      {isWorking && (
        <TouchableOpacity
          style={[styles.breakButton, {backgroundColor: breakButtonBgColor}]}
          onPress={breakHandler}
          disabled={breaksLeft <= 0 && !currentBreak}>
          <Text style={styles.breakButtonText}>{breakButtonText}</Text>
        </TouchableOpacity>
      )}

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
    marginBottom: 10,
    fontSize: 24,
    color: 'black',
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
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startWorkText: {
    color: mainLight,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  breakButtonText: {
    color: mainLight,
    fontWeight: 'bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  breakButton: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '80%',
    marginTop: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  breaksLeftText: {
    textAlign: 'center',
    marginBottom: 2,
    fontWeight: 'bold',
    color: actionPositive,
  },
});
