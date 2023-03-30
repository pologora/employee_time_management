exports = async function ({ query, headers, body }, response) {
    const { pin } = query;
    const collection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const projection = {
      name: 1, surname: 1, pin: 1, isSnti:1, vacationDaysPerYear:1 
    };
    const employee = await collection.findOne({pin:pin}, projection)
  
    return employee;
  };