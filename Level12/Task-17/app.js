const fs = require('fs');
const crypto = require('crypto');
const path = require('path');


const originalFilePath = './test.txt';
const encryptedFilePath = './test_encrypted.txt';
const decryptedFilePath = './test_decrypted.txt';
const algorithm = 'aes-256-cbc';
const password = 'mysecretpassword';
const key = crypto.scryptSync(password, 'salt', 32); 
const iv = crypto.randomBytes(16); 
function createTestFile() {
  const content = 'This is some sensitive information. Keep it safe!';
  
  fs.writeFile(originalFilePath, content, (err) => {
    if (err) {
      console.error('Error creating test file:', err);
      return;
    }
    console.log('Test file created successfully.');
    encryptFile(); 
  });
}
function encryptFile() {
  fs.readFile(originalFilePath, (err, data) => {
    if (err) {
      console.error('Error reading original file:', err);
      return;
    }
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(data);
    encryptedData = Buffer.concat([encryptedData, cipher.final()]);

    
    fs.writeFile(encryptedFilePath, iv.toString('hex') + ':' + encryptedData.toString('hex'), (err) => {
      if (err) {
        console.error('Error writing encrypted file:', err);
        return;
      }
      console.log('File encrypted successfully.');
      decryptFile();
    });
  });
}


function decryptFile() {
  fs.readFile(encryptedFilePath, (err, data) => {
    if (err) {
      console.error('Error reading encrypted file:', err);
      return;
    }

    const [ivHex, encryptedDataHex] = data.toString().split(':');
    const ivBuffer = Buffer.from(ivHex, 'hex');
    const encryptedDataBuffer = Buffer.from(encryptedDataHex, 'hex');

   
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    let decryptedData = decipher.update(encryptedDataBuffer);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    
    fs.writeFile(decryptedFilePath, decryptedData, (err) => {
      if (err) {
        console.error('Error writing decrypted file:', err);
        return;
      }
      console.log('File decrypted successfully.');
      verifyDecryptedFile(); 
    });
  });
}
function verifyDecryptedFile() {
  fs.readFile(originalFilePath, 'utf8', (err, originalContent) => {
    if (err) {
      console.error('Error reading original file for verification:', err);
      return;
    }

    fs.readFile(decryptedFilePath, 'utf8', (err, decryptedContent) => {
      if (err) {
        console.error('Error reading decrypted file for verification:', err);
        return;
      }

      if (originalContent === decryptedContent) {
        console.log('Decrypted content matches the original content.');
      } else {
        console.error('Decrypted content does not match the original content.');
      }
    });
  });
}
createTestFile();
