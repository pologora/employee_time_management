exports = async function ({ query, headers, body }, response) {
    const vacationCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
    
    const dataBody = JSON.parse(body.text())
  
    const { id, startVacation, endVacation, type, duration } = dataBody;
    const objectId = new BSON.ObjectId(id);
  
    if (!id || !startVacation || !endVacation || !type || !duration) {
      response.setStatusCode(400);
      
      return { error: 'Missing required query parameters (id, startVacation, endVacation, type or duration).' };
    }
    
    const timeNow = new Date();
    
    const data = {
      employeeId: objectId,
      startVacation: new Date(startVacation),
      endVacation: new Date(endVacation),
      type,
      duration,
      created_at: timeNow
    };
  
    try {
      const result = await vacationCollection.insertOne(data);
      
      return result;
    } catch (error) {
      response.setStatusCode(500);
      
      return { error: error.message };
    }
  };