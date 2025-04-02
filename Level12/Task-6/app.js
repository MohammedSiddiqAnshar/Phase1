const fs = require('fs');
const originalFilePath = 'te.txt';
const renamedFilePath = 're.txt';
fs.writeFile(originalFilePath, 'This is the original file content.', (err) => {
  if (err) {
    console.error('Error creating the file:', err);
    return;
  }

  console.log(`File "${originalFilePath}" created successfully!`);
  fs.rename(originalFilePath, renamedFilePath, (err) => {
    if (err) {
      console.error('Error renaming the file:', err);
      return;
    }

    console.log(`File successfully renamed to "${renamedFilePath}"`);
    fs.access(renamedFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error(`The file "${renamedFilePath}" does not exist.`);
      } else {
        console.log(`The file "${renamedFilePath}" exists after renaming.`);
      }
    });
  });
});
