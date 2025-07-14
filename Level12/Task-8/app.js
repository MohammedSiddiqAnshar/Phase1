const fs = require('fs');
const path = require('path');
const currentDirectory = __dirname;
fs.readdir(currentDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  files.forEach((file) => {
    const filePath = path.join(currentDirectory, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      console.log(`[Directory] ${file}`);
    } else {
      console.log(`[File] ${file}`);
    }
  });
});
