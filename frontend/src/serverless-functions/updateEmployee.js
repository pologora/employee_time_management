exports = async function ({ query, headers, body }, response) {
    const collection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const data = JSON.parse(body.text());
    const { pin, _id, name, surname, vacationDaysPerYear, isSnti } = data;
  
    const update = {
      $set: {
        pin,
        name,
        surname,
        vacationDaysPerYear,
        isSnti,
      },
    };
  
    // Convert the _id string to an ObjectId
    const objectId = new BSON.ObjectId(_id);
  
    // Check if pin is already in use, excluding the document being updated
    const existingEmployee = await collection.findOne({ pin, _id: { $ne: objectId } });
    if (existingEmployee) {
      return { error: 'Pin already in use' };
    }
  
    const result = await collection.updateOne({ _id: objectId }, update);
  
    return result;
  };