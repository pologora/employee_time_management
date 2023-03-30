exports = function({ query, headers, body }, response) {
    const vacationCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
  
    const {id} = query
    if(!id){
      return {error: "No such id"}
    }
    const objectId = BSON.ObjectId(id);
  
    try {
      const result = vacationCollection.findOne({_id: objectId });
    
      return result;
    } catch (err) {
      console.error('Error:', err);
      response.setStatusCode(400);
      
      return { error: err.message };
    }
  };
  