const fs = require('fs');
const path = require('path');
function createLargeTestFile() {
  const filePath = './largeTestFile.txt';
  const fileSize = 1 * 1024 * 1024; 
  const content = 'This is a large test file content. '.repeat(50); 

  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error('Error creating the large test file:', err);
      return;
    }
    console.log(`Large test file created at: ${filePath}`);
    copyFileWithStreams(filePath); 
  });
}
function copyFileWithStreams(sourceFilePath) {
  const destinationFilePath = './largeTestFileCopy.txt';
  const stats = fs.statSync(sourceFilePath);
  const totalBytes = stats.size;
  let copiedBytes = 0;
  const readStream = fs.createReadStream(sourceFilePath);
  const writeStream = fs.createWriteStream(destinationFilePath);
  readStream.pipe(writeStream);
  readStream.on('data', (chunk) => {
    copiedBytes += chunk.length;
    const progress = ((copiedBytes / totalBytes) * 100).toFixed(2);
    process.stdout.write(`Progress: ${progress}%\r`);
  });
  readStream.on('error', (err) => {
    console.error('Error reading the source file:', err);
  });

  writeStream.on('error', (err) => {
    console.error('Error writing to the destination file:', err);
  });

  writeStream.on('finish', () => {
    console.log('\nFile copy completed successfully.');
  });
}
createLargeTestFile();
