const fs = require('fs');
const path = require('path');

const inputCsvPath = './data.csv';
const outputResultsPath = './results.txt';

function createCsvFile() {
  const csvContent = `name,score1,score2,score3
siddiq,95,82,90
mohammed,88,91,80
yyyy,94,89,77
Suresh,80,78,85`;

  fs.writeFile(inputCsvPath, csvContent, (err) => {
    if (err) {
      console.error('Error creating CSV file:', err);
      return;
    }
    console.log('CSV file created successfully.');
    processCsvData(); 
  });
}


function processCsvData() {
  
  fs.readFile(inputCsvPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading CSV file:', err);
      return;
    }

    
    const rows = data.trim().split('\n');
    const headers = rows[0].split(','); 
    const scoresData = rows.slice(1).map(row => row.split(','));


    const results = scoresData.map(row => {
      const name = row[0];
      const scores = row.slice(1).map(Number); 
      const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
      const max = Math.max(...scores);
      const min = Math.min(...scores);
      return { name, average, max, min };
    });


    writeResultsToFile(results);
  });
}


function writeResultsToFile(results) {
  const resultsText = results.map(result => 
    `${result.name}: Average = ${result.average.toFixed(2)}, Max = ${result.max}, Min = ${result.min}`
  ).join('\n');

  fs.writeFile(outputResultsPath, resultsText, (err) => {
    if (err) {
      console.error('Error writing results to file:', err);
      return;
    }
    console.log('Results written to file successfully.');
  });
}


createCsvFile();
