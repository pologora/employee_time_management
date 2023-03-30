exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const workdaysCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
    
    // const data = JSON.parse(query.text());
    const { id, startDate, endDate } = query;
    const objectId = new BSON.ObjectId(id);
   
    
    const employee = await employeeCollection.findOne({ _id: objectId });
    if (!employee) {
      return response.setStatusCode(404);
    }
    
    let start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);
  
    let end = new Date();
    end.setHours(23, 59, 59, 999);
  
    if (startDate) {
      start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
    }
  
    if (endDate) {
      end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
    }
    
    const workdays = await workdaysCollection.find({
      employeeId: objectId,
      startWork: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    }).toArray();
    
    return workdays;
  };