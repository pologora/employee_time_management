import {Realm, createRealmContext} from '@realm/react';

export class EmployeeModel extends Realm.Object<EmployeeModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  surname!: string;
  pin!: string;
  isWorking!: boolean;
  vacationDaysPerYear!: number;
  isSnti!: boolean;

  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      name: 'string',
      email: 'string?',
      surname: 'string',
      agency: 'objectId?',
      userId: 'objectId?',
      pin: 'string',
      isSnti: {type: 'bool', default: false},
      isWorking: {type: 'bool', default: false},
      vacationDaysPerYear: {type: 'double', default: 0},
    },
  };
}

export class WorkTimeModel extends Realm.Object<WorkTimeModel> {
  _id!: Realm.BSON.ObjectId;
  employeeId!: Realm.BSON.ObjectId;
  startWork!: Date;
  endWork!: Date;

  static schema = {
    name: 'Workdays',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      startWork: 'date',
      endWork: {type: 'date?', default: null},
      employeeId: 'objectId',
    },
  };
}

export class VacationModel extends Realm.Object<VacationModel> {
  _id!: Realm.BSON.ObjectId;
  startVacation!: Date;
  employeeId!: Realm.BSON.ObjectId;
  endVacation!: Date;
  type!: string;
  duration!: number;
  created_at!: Date;

  static schema = {
    name: 'Vacations',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      employeeId: 'objectId',
      startVacation: 'date',
      endVacation: 'date',
      type: 'string',
      duration: 'double',
      created_at: 'date',
    },
  };
}

export class BreakModel extends Realm.Object<BreakModel> {
  _id!: Realm.BSON.ObjectId;
  employeeId!: Realm.BSON.ObjectId;
  startBreak!: Date;
  endBreak!: Date;

  static schema = {
    name: 'Break',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      employeeId: 'objectId',
      startBreak: 'date',
      endBreak: {type: 'date?', default: null},
    },
  };
}

export class AdminSettingsModel extends Realm.Object<AdminSettingsModel> {
  maxBreaksPerDay!: number;
  defaultBreakDuration!: number;

  static schema = {
    name: 'AdminSettings',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      maxBreaksPerDay: {type: 'int', default: 3},
      defaultBreakDuration: {type: 'int', default: 5},
    },
  };
}

export const employeeContext = createRealmContext({
  schema: [
    EmployeeModel,
    WorkTimeModel,
    VacationModel,
    BreakModel,
    AdminSettingsModel,
  ],
});
