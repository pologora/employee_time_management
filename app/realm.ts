import {Realm, createRealmContext} from '@realm/react';

export class EmployeeModel extends Realm.Object<EmployeeModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  surname!: string;
  pin!: string;
  isWorking!: boolean;
  workDays!: Array<WorkTimeModel>;
  vacationDays!: Array<VacationModel>;
  vacationDaysPerYear!: number;
  isSnti!: boolean;

  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      name: 'string',
      surname: 'string',
      pin: 'string',
      isSnti: {type: 'bool', default: false},
      isWorking: {type: 'bool', default: false},
      workDays: {type: 'WorkTime[]', default: () => []},
      vacationDays: {type: 'Vacations[]', default: () => []},
      vacationDaysPerYear: {type: 'int', default: 0},
    },
  };
}

export class WorkTimeModel extends Realm.Object<WorkTimeModel> {
  _id!: Realm.BSON.ObjectId;
  pin!: string;
  startWork!: Date;
  endWork!: Date;

  static schema = {
    name: 'WorkTime',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      startWork: 'date',
      endWork: {type: 'date?', default: null},
      pin: 'string',
      employee: {
        type: 'linkingObjects',
        objectType: 'Employee',
        property: 'workDays',
      },
    },
  };
}

export class VacationModel extends Realm.Object<VacationModel> {
  _id!: Realm.BSON.ObjectId;
  pin!: string;
  startVacation!: Date;
  endVacation!: Date;

  static schema = {
    name: 'Vacations',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      startVacation: 'date',
      endVacation: 'date',
      pin: 'string',
      employee: {
        type: 'linkingObjects',
        objectType: 'Employee',
        property: 'vacationDays',
      },
    },
  };
}

export const employeeContext = createRealmContext({
  schema: [EmployeeModel, WorkTimeModel, VacationModel],
});
