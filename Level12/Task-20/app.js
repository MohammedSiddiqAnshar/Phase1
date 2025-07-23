const fs = require('fs');
const path = require('path');


const directoryToWatch = './watchedDir';
const logFile = './changeLog.txt';


function createTestDirectory() {
  if (!fs.existsSync(directoryToWatch)) {
    fs.mkdirSync(directoryToWatch, { recursive: true });
  }

  fs.writeFileSync(path.join(directoryToWatch, 'testFile1.txt'), 'Initial content for test file 1.');
  fs.writeFileSync(path.join(directoryToWatch, 'testFile2.txt'), 'Initial content for test file 2.');
  console.log('Test directory and files created.');
}


function logChange(changeType, filename) {
  const logMessage = `${new Date().toISOString()} - ${changeType}: ${filename}\n`;


  fs.appendFile(logFile, logMessage, (err) => {
    if (err) {
      console.error('Error logging change:', err);
    }
  });


  console.log(logMessage);
}


function watchDirectory() {
  fs.watch(directoryToWatch, { recursive: true }, (eventType, filename) => {
    if (!filename) {
      console.log('No filename provided');
      return;
    }

    switch (eventType) {
      case 'rename':
      
        fs.access(path.join(directoryToWatch, filename), fs.constants.F_OK, (err) => {
          if (err) {

            logChange('DELETED', filename);
          } else {

            logChange('CREATED', filename);
          }
        });
        break;
      case 'change':
   
        logChange('MODIFIED', filename);
        break;
      default:
        console.log(`Unknown event: ${eventType}`);
    }
  });

  console.log('Watching for changes in', directoryToWatch);
}


let timeout;
function debouncedWatch(eventType, filename) {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    logChange(eventType, filename);
  }, 300); 
}


createTestDirectory();
watchDirectory(); 
setTimeout(() => {
  fs.writeFileSync(path.join(directoryToWatch, 'testFile1.txt'), 'Updated content for test file 1.');
}, 2000);

setTimeout(() => {
  fs.renameSync(path.join(directoryToWatch, 'testFile1.txt'), path.join(directoryToWatch, 'renamedFile.txt'));
}, 4000);

setTimeout(() => {
  fs.unlinkSync(path.join(directoryToWatch, 'testFile2.txt'));
}, 6000);
