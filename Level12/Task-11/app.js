const fs = require('fs');
const filePath = 'sidd.txt';
fs.watch(filePath, (eventType, filename) => {
  if (filename) {
    if (eventType === 'change') {
      console.log(`The file "${filename}" was changed.`);
    } else if (eventType === 'rename') {
      console.log(`The file "${filename}" was renamed or deleted.`);
    }
  } else {
    console.log('Filename not provided');
  }
});

console.log(`Watching for changes on ${filePath}...`);
