const fs = require('fs');

// Read file
fs.readFile(
  'C:\\Users\\zloil\\Desktop\\magazyn\\frontend\\src\\utils\\MOCK_DATA.json',
  'utf8',
  (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const json = JSON.parse(data);

    // Modify data
    json.forEach((item) => {
      item.pin = String(item.pin); // convert pin to a string
    });

    // Write file
    fs.writeFile('MOCK_DATA2.json', JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('File has been updated');
    });
  },
);
