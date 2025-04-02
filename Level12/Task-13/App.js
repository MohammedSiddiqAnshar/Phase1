const fs = require('fs');
const path = require('path');
function createTempFiles() {
  fs.mkdtemp(path.join(__dirname, 'tempDir-'), (err, tempDirPath) => {
    if (err) {
      console.error('Error creating temporary directory:', err);
      return;
    }
    console.log(`Temporary directory created at: ${tempDirPath}`);
    const filesData = [
      { filename: 'file1.txt', data: 'This is the content of file 1.' },
      { filename: 'file2.txt', data: 'This is the content of file 2.' },
      { filename: 'file3.txt', data: 'This is the content of file 3.' }
    ];
    filesData.forEach((file, index) => {
      const filePath = path.join(tempDirPath, file.filename);
      fs.writeFile(filePath, file.data, (err) => {
        if (err) {
          console.error(`Error writing to file ${filePath}:`, err);
          return;
        }

        console.log(`File created at: ${filePath}`);
      });
    });
  });
}

createTempFiles();
