import {Realm, createRealmContext} from '@realm/react';

export class EmployeeModel extends Realm.Object<EmployeeModel> {
  _id!: Realm.BSON.ObjectId;
  name!: string;
  surname!: string;
  pin!: string;
  isWorking!: boolean;

  static schema = {
    name: 'Employee',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      name: 'string',
      surname: 'string',
      pin: 'string',
      isWorking: {type: 'bool', default: false},
    },
  };
}

export class WorkTimeModel extends Realm.Object<WorkTimeModel> {
  _id!: Realm.BSON.ObjectId;
  pin!: string;
  startWork!: Date;
  endWork!: Date;

  static schema = {
    name: 'Workdays',
    primaryKey: '_id',
    properties: {
      _id: {type: 'objectId', default: () => new Realm.BSON.ObjectId()},
      startWork: 'date',
      endWork: {type: 'date?', default: null},
      pin: 'string',
    },
  };
}

export const employeeContext = createRealmContext({
  schema: [EmployeeModel, WorkTimeModel],
});
