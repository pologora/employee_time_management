exports = async function ({ query, headers, body }, response) {
    const { id } = query;
    const objectId = new BSON.ObjectId(id);
    
    const workdaysCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
    
    const workTime = await workdaysCollection.findOne({_id:objectId })
  
    return workTime;
  };