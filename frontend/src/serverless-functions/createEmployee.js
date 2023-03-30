exports = async function ({ query, headers, body }, response) {
    const collection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const data = JSON.parse(body.text())
    const { name, surname, isWorking=false, isSnti=false, pin, vacationDays=[], workDays=[], vacationDaysPerYear=0 } = data
    
  
    
    // check if pin is already in use
    const existingEmployee = await collection.findOne({ pin });
    if (existingEmployee) {
      return { error: 'Pin already in use' };
    }
    
    const result = await collection.insertOne({ name, surname, isSnti, isWorking, pin, vacationDays, workDays, vacationDaysPerYear });
  
    return result
  };