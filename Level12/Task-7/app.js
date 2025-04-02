const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, 'new_folder');
fs.access(directoryPath, fs.constants.F_OK, (err) => {
  if (err) {
    fs.mkdir(directoryPath, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return;
      }
      console.log('Directory "new_folder" created successfully!');
    });
  } else {
    console.log('The directory "new_folder" already exists.');
  }
});
