const fs = require('fs');
const path = require('path');
const sourceFilePath = 'source.txt';
const destinationFilePath = 'destination.txt';
fs.writeFile(sourceFilePath, 'Hii I am siddiq From the Department of Information Technology.', (err) => {
  if (err) {
    console.error('Error creating the source file:', err);
    return;
  }

  console.log(`Source file "${sourceFilePath}" created successfully!`);
  fs.access(destinationFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      
      fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
          console.error('Error copying the file:', err);
          return;
        }

        console.log(`File copied successfully to "${destinationFilePath}"`);
        fs.access(destinationFilePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(`The file "${destinationFilePath}" does not exist.`);
          } else {
            console.log(`The file "${destinationFilePath}" exists after copying.`);
          }
        });
      });
    } else {
      console.log('The destination file already exists.');
    }
  });
});
