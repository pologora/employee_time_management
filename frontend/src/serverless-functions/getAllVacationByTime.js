exports = async function({ query, headers, body }, response) {
    const vacationCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Vacations');
    
    const { start, end } = query;
    let startDate;
    let endDate;
    
    if(start && end) {
      startDate = new Date( start)
      endDate = new Date(end)
    }else {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);
    
    startDate = new Date(startOfYear);
    endDate =new Date(endOfYear);
    }
    
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);
  
    const matchStage = {
    startVacation: {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  };
    try {
      const vacationsList = await vacationCollection
        .aggregate([
          { $match: matchStage },
          {
            $lookup: {
              from: 'Employee',
              localField: 'employeeId',
              foreignField: '_id',
              as: 'employeeData',
            },
          },
          {
            $project: {
              _id: 1,
              startVacation: 1,
              endVacation: 1,
              duration: 1,
              type: 1,
              created_at: 1,
              employeeId: 1,
              name: { $arrayElemAt: ['$employeeData.name', 0] },
              surname: { $arrayElemAt: ['$employeeData.surname', 0] },
            },
          },
          { $sort: { created_at: -1 } },
        ])
        .toArray();
  
      return vacationsList;
    } catch (err) {
      console.error('Error:', err);
      response.setStatusCode(400);
      return { error: err.message };
    }
  };
  