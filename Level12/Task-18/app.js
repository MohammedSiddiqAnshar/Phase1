const fs = require('fs');
const path = require('path');
const sourceDir = './sourceDir';
const targetDir = './targetDir';


function createTestDirectories() {
  
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.writeFileSync(path.join(sourceDir, 'file1.txt'), 'This is file 1 in source.');
  fs.writeFileSync(path.join(sourceDir, 'file2.txt'), 'This is file 2 in source.');
  fs.writeFileSync(path.join(sourceDir, 'file3.txt'), 'This is file 3 in source.');

  
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, 'file1.txt'), 'This is file 1 in target.');
  fs.writeFileSync(path.join(targetDir, 'file4.txt'), 'This is file 4 in target.');

  console.log('Test directories and files created.');
  syncDirectories();
}
function syncDirectories() {
  fs.readdir(sourceDir, (err, sourceFiles) => {
    if (err) {
      console.error('Error reading source directory:', err);
      return;
    }

    fs.readdir(targetDir, (err, targetFiles) => {
      if (err) {
        console.error('Error reading target directory:', err);
        return;
      }

      let filesCopied = 0;
      let filesDeleted = 0;
      sourceFiles.forEach(file => {
        const sourceFilePath = path.join(sourceDir, file);
        const targetFilePath = path.join(targetDir, file);

        fs.stat(sourceFilePath, (err, sourceStat) => {
          if (err) {
            console.error(`Error getting stats for file ${sourceFilePath}:`, err);
            return;
          }
          fs.stat(targetFilePath, (err, targetStat) => {
            if (err || sourceStat.mtime > targetStat.mtime) {
             
              fs.copyFile(sourceFilePath, targetFilePath, (err) => {
                if (err) {
                  console.error(`Error copying file ${file}:`, err);
                  return;
                }
                console.log(`Copied ${file} from source to target.`);
                filesCopied++;
              });
            }
          });
        });
      });
      targetFiles.forEach(file => {
        if (!sourceFiles.includes(file)) {
          const targetFilePath = path.join(targetDir, file);

         
          fs.unlink(targetFilePath, (err) => {
            if (err) {
              console.error(`Error deleting file ${file}:`, err);
              return;
            }
            console.log(`Deleted ${file} from target.`);
            filesDeleted++;
          });
        }
      });

      
      setTimeout(() => {
        console.log(`\nSync Summary:`);
        console.log(`Files copied: ${filesCopied}`);
        console.log(`Files deleted: ${filesDeleted}`);
      }, 1000); 
    });
  });
}
createTestDirectories();
