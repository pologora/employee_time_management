exports = async function ({ query, headers, body }, response) {
    const workdaysCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
    
    const { id } = query;
    const objectId = new BSON.ObjectId(id);
    
    if (!id ) {
      response.setStatusCode(400);
      return { error: 'Missing required query parameters (id).' };
    }
    
    try {
      const result = await workdaysCollection.deleteOne({ _id: objectId });
      return result;
    } catch (error) {
      response.setStatusCode(500);
      return { error: error.message };
    }
  };