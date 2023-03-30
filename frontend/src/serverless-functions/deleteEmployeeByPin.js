exports = async function ({ query, headers, body }, response) {
    try {
      const { id } = query;
      const objectId = new BSON.ObjectId(id);
  
      const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
      const workdaysCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
      const vacationsCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
  
      const employee = await employeeCollection.deleteOne({ _id: objectId });
  
      if (employee.deletedCount === 1) {
        await workdaysCollection.deleteMany({ employeeId: objectId });
        await vacationsCollection.deleteMany({ employeeId: objectId });
      }
  
      return employee;
    } catch (error) {
      console.error('Error while deleting employee:', error);
      response.setStatusCode(500);
      return { error: 'An error occurred while deleting the employee.' };
    }
  };