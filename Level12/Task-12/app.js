const fs = require('fs');
const path = require('path');


function readDirRecursive(directoryPath) {
  
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${directoryPath}:`, err);
      return;
    }

    
    files.forEach((file) => {
      const fullPath = path.join(directoryPath, file);

     
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          console.error(`Error getting stats for ${fullPath}:`, err);
          return;
        }

        
        if (stats.isDirectory()) {
          console.log(`[Directory] ${fullPath}`);
          
          readDirRecursive(fullPath);
        } else {
          console.log(`[File] ${fullPath}`);
        }
      });
    });
  });
}

const startingDirectory = './testDir';


readDirRecursive(startingDirectory);
