const fs = require('fs');
const filePath = 'output.txt';
if (fs.existsSync(filePath)) {
  console.log('The file output.txt exists!');
} else {
  console.log('The file output.txt does not exist.');
}
