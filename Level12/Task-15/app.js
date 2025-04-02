const fs = require('fs');
const path = require('path');


const jsonFilePath = './data.json';
function createJsonFile() {
  const data = [
    { id: 1, name: 'Siddiq', age: 30 },
    { id: 2, name: 'Mohammed', age: 25 },
    { id: 3, name: 'yyyy', age: 35 }
  ];


  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error('Error creating JSON file:', err);
      return;
    }
    console.log('JSON file created successfully.');
    modifyJsonFile(); 
  });
}
function modifyJsonFile() {
  fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return;
    }

    try {
  
      const jsonData = JSON.parse(data);
      jsonData.push({ id: 4, name: 'Alice Cooper', age: 28 });


      const samIndex = jsonData.findIndex(item => item.name === 'Sam Brown');
      if (samIndex !== -1) {
        jsonData[samIndex].age = 36;
      }


      const janeIndex = jsonData.findIndex(item => item.name === 'Jane Smith');
      if (janeIndex !== -1) {
        jsonData.splice(janeIndex, 1);
      }
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error('Error writing modified JSON to file:', err);
          return;
        }
        console.log('JSON file updated successfully.');
      });

    } catch (parseErr) {
      console.error('Error parsing JSON data:', parseErr);
    }
  });
}
createJsonFile();
