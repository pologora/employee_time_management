import Realm from 'realm';

const EmployeeSchema = {
  name: 'Employee',
  primaryKey: 'pin',
  properties: {
    name: 'string',
    surname: 'string',
    pin: 'string',
    isWorking: 'bool',
  },
};

const WorkingHoursSchema = {
  name: 'WorkingHours',
  properties: {
    employee: 'Employee',
    startWork: 'date',
    endWork: 'date',
  },
};

const realm = new Realm({ schema: [EmployeeSchema, WorkingHoursSchema] });

export default realm;
