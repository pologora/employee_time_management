exports = async function ({ query, headers, body }, response) {
    const collection = context.services.get('mongodb-atlas').db('magazyn').collection('Workdays');
      const {startDate, endDate, isSnti=false} = query
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      
    const result = await collection.aggregate([
      {
        $match: {
          startWork: { $gte:start },
          endWork: { $lte: end }
        }
      },
      {
        $group: {
          _id: "$employeeId",
          totalWorkMinutes: {
            $sum: {
              $divide: [
                { $subtract: ["$endWork", "$startWork"] },
                1000 * 60
              ]
            }
          }
        }
      },
      {
        $lookup: {
          from: "Employee",
          localField: "_id",
          foreignField: "_id",
          as: "employee"
        }
      },
      {
        $unwind: "$employee"
      },
       {
        $match: {
          "employee.isSnti": isSnti === 'true' // or false depending on your query string format
        }
      },
      {
        $project: {
          _id: 0,
          name: "$employee.name",
          surname: "$employee.surname",
          isSnti: '$employee.isSnti',
          totalWorkMinutes: 1,
        }
      },
      {
        $sort: {
          totalWorkMinutes: 1
        }
      }
      ]).toArray();
     
    
    
    return result;
    
    };
    