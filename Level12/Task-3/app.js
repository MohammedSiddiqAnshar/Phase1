const fs = require('fs');
const textToAppend = "hello its me Mohammed";
const filePath = 'output.txt';
fs.appendFile(filePath, textToAppend, (err) => {
  if (err) {
    console.error('An error occurred while appending to the file:', err);
  } else {
    console.log('Text has been successfully appended to the file!');
  }
});
