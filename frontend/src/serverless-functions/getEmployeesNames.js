exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    
    
    const projection = {
      name:1,
      surname:1,
      isSnti: 1
    }
  
    try {
    const result = await employeeCollection.find({},projection).toArray();
  
      return result;
    } catch (error) {
      console.error('Error:', error);
      response.setStatusCode(400);
      
      return { error: 'Invalid query parameter.' };
    }
  };