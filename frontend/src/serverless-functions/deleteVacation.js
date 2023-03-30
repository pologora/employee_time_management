exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const vacationCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
    
    const {id} = query
    if(!id){
      
      return {error: 'Nie podano id volnego'}
    }
    
    const vacationObjectId = new BSON.ObjectId(id);
    
    try {
      const result = await vacationCollection.deleteOne({_id: vacationObjectId});
      if(!result){
      
      return {error: 'Nie znaleziono wolnego'}
    }
      
      return result;
    } catch (error) {
      response.setStatusCode(500);
      
      return { error: error.message };
    }
  };