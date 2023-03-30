exports = async function ({ query, headers, body }, response) {
  const collection = context.services
    .get('mongodb-atlas')
    .db('magazyn')
    .collection('Employee');
  const data = JSON.parse(body.text());

  const result = await collection.insertMany(data);

  return result;
};
