exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const workdaysCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
  
    const { id, startWork, endWork } = query;
  
    if (!id || !startWork || !endWork) {
      response.setStatusCode(400);
      return { error: 'Missing required query parameters (id, startTime, endWork).' };
    }
    
    const objectId = new BSON.ObjectId(id);
  
     const data = {
      employeeId: objectId,
      startWork: new Date(startWork),
      endWork: new Date(endWork)
    };
  
    try {
      const result = await workdaysCollection.insertOne(data);
  
  
      return result;
    } catch (error) {
      response.setStatusCode(500);
      return { error: error.message };
    }
  };