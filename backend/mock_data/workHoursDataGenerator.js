const fs = require('fs');

function getRandomPin() {
  return Math.floor(Math.random() * (150 - 101 + 1) + 101);
}

function getRandomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateFakeData() {
  const startDate = new Date('2023-02-28T00:00:00Z');
  const endDate = new Date('2023-03-31T24:00:00Z');
  const data = [];

  for (let i = 0; i < 1200; i++) {
    const startWork = getRandomDate(startDate, endDate);
    const endWork = new Date(
      startWork.getTime() + Math.random() * 2 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000,
    );
    const pin = getRandomPin();

    data.push({ pin, startWork, endWork });
  }

  return data;
}

const fakeData = generateFakeData();
const jsonData = JSON.stringify(fakeData, null, 2);

fs.writeFile('fakeData.json', jsonData, (err) => {
  if (err) throw err;
  console.log('Fake data saved to fakeData.json');
});
