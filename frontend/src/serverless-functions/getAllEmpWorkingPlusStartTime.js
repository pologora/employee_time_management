exports = async function ({ query, headers, body }, response) {
    const queryObj = { isWorking: true };
  
    const collection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
    const employeeList = await collection
      .aggregate([
        {
          $match: queryObj,
        },
        {
          $lookup: {
            from: 'Workdays',
            localField: '_id', 
            foreignField: 'employeeId', 
            as: 'workdays',
          },
        },
        {
          $unwind: '$workdays',
        },
        {
          $match: { 'workdays.endWork': null },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            surname: { $first: '$surname' },
            startWork: { $max: '$workdays.startWork' },
          },
        },
        {
          $sort: { startWork: 1 },
        },
      ])
      .toArray();
  
    return employeeList;
  };