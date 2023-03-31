exports = async function ({ query, headers, body }, response) {
    const employeeCollection = context.services.get('mongodb-atlas').db('magazyn').collection('Employee');
  
    const { startDate, endDate } = query;
  
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
  
    // Find all employees with isSnti set to true
    const sntiEmployees = await employeeCollection.find({ isSnti: true }).toArray();
    
    const employeeDataPromises = sntiEmployees.map(async (employee) => {
      const employeeId = employee._id.toString();
      const employeeData = await employeeCollection.aggregate([
        { $match: { _id: BSON.ObjectId(employeeId) } },
         {
      $lookup: {
        from: "Workdays",
        localField: "_id",
        foreignField: "employeeId",
        as: "workdays",
      },
    },
    {
      $addFields: {
        workdays: {
          $filter: {
            input: "$workdays",
            as: "workday",
            cond: {
              $and: [
                { $gte: ["$$workday.startWork", new Date(start)] },
                { $lte: ["$$workday.startWork", new Date(end)] },
              ],
            },
          },
        },
      },
    },
    {
      $addFields: {
        workhours: {
          $map: {
            input: "$workdays",
            as: "workday",
            in: {
              startWork: "$$workday.startWork",
              endWork: "$$workday.endWork",
              total: { $divide: [{ $subtract: ["$$workday.endWork", "$$workday.startWork"] }, 1000 * 60] },
            },
          },
        },
      },
    },
    {
      $addFields: {
        totalWorkHours: { $sum: "$workhours.total" },
      },
    },
    {
      $project: {
        workdays: 0,
        isSnti: 0,
        isWorking: 0,
        pin: 0,
        vacationDaysPerYear: 0,
      },
    },
    {
      $lookup: {
        from: "Vacations",
        let: { employeeId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$employeeId", "$$employeeId"] },
                  { $gte: ["$startVacation", new Date(start)] },
                  { $lte: ["$startVacation", new Date(end)] },
                ],
              },
            },
          },
        ],
        as: "vacations",
      },
    },
      ]).toArray();
  
      return employeeData[0];
    });
  
    const allEmployeeData = await Promise.all(employeeDataPromises);
  
    return allEmployeeData;
  };
  