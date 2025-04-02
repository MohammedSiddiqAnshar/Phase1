const fs = require('fs');
const filePath = 'sidd.txt';
function formatDate(date) {
  return date.toLocaleString(); 
}
fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error('An error occurred while getting file stats:', err);
    return;
  }
  console.log(`File Size: ${stats.size} bytes`);
  console.log(`Creation Time: ${formatDate(stats.birthtime)}`);
  console.log(`Last Modified Time: ${formatDate(stats.mtime)}`);
});
