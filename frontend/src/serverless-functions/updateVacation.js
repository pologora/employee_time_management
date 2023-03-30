exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const vacationCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
    
    const data = JSON.parse(body.text());
    const { startVacation, endVacation, duration, type, employeeId, id } = data;
    const timeNow = new Date();
    
    if (!id || !startVacation || !endVacation || !type || !duration || !employeeId) {
      response.setStatusCode(400);
      
      return { error: 'Missing required query parameters (id, startVacation, endVacation, type, duration, employeeId).' };
    }
  
    const vacationObjectId = new BSON.ObjectId(id);
    const employeeObjectId = new BSON.ObjectId(employeeId);
    
    const update = {
      $set: {
        startVacation: new Date(startVacation),
        endVacation: new Date(endVacation),
        duration,
        type,
        employeeId: employeeObjectId,
        created_at: timeNow,
      },
    };
    
  try {
      const result = await vacationCollection.updateOne({ _id: vacationObjectId }, update);
      
      return result;
    } catch (error) {
      response.setStatusCode(500);
      
      return { error: error.message };
    }
    
  };