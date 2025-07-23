const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const keyLength = 32; 
const ivLength = 16;  

const getKey = (password) => crypto.scryptSync(password, 'salt', keyLength);

const encryptFile = (filePath, password) => {
  const iv = crypto.randomBytes(ivLength);
  const key = getKey(password);
  const cipher = crypto.createCipheriv(algorithm, key, iv);

  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(`${filePath}.enc`);

  output.write(iv); 

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log(`✅ Encrypted: ${filePath} -> ${filePath}.enc`);
  });
};

const decryptFile = (filePath, password) => {
  const input = fs.createReadStream(filePath);

  let iv;
  input.once('readable', () => {
    iv = input.read(ivLength);
    const key = getKey(password);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    const outputPath = filePath.replace(/\.enc$/, '');
    const output = fs.createWriteStream(outputPath);

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
      console.log(`✅ Decrypted: ${filePath} -> ${outputPath}`);
    });
  });
};


const main = () => {
  const [,, cmd, file, password] = process.argv;

  if (!cmd || !file || !password) {
    console.log(`Usage:
  node fileCrypto.js encrypt <filepath> <password>
  node fileCrypto.js decrypt <encrypted_filepath> <password>`);
    return;
  }

  if (cmd === 'encrypt') encryptFile(file, password);
  else if (cmd === 'decrypt') decryptFile(file, password);
  else console.log('Unknown command');
};

main();
