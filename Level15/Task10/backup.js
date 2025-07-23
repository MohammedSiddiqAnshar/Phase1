const fs = require('fs').promises;
const path = require('path');
const { existsSync, mkdirSync } = require('fs');

const sourceDir = process.argv[2];
const backupRoot = process.argv[3];
const maxBackups = 5; // configurable

if (!sourceDir || !backupRoot) {
  console.error('Usage: node backup.js <sourceDir> <backupDir>');
  process.exit(1);
}

// Helper to get timestamped folder name
const getTimestampFolder = () => {
  const now = new Date();
  return now.toISOString().replace(/[:.]/g, '-');
};

// Recursively copy files
async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

// Maintain only max N backups
async function pruneOldBackups(dir) {
  const folders = (await fs.readdir(dir))
    .filter(f => /^\d{4}-/.test(f)) // only timestamp folders
    .sort(); // oldest first

  const excess = folders.length - maxBackups;
  for (let i = 0; i < excess; i++) {
    const toDelete = path.join(dir, folders[i]);
    await fs.rm(toDelete, { recursive: true, force: true });
    console.log(`Old backup removed: ${folders[i]}`);
  }
}

// Create backup log
async function logBackup(logPath, folderName) {
  const entry = `${new Date().toISOString()} - Backup created: ${folderName}\n`;
  await fs.appendFile(logPath, entry);
}

// Main backup logic
(async () => {
  try {
    if (!existsSync(sourceDir)) throw new Error('Source directory does not exist.');
    if (!existsSync(backupRoot)) mkdirSync(backupRoot, { recursive: true });

    const timestamp = getTimestampFolder();
    const backupPath = path.join(backupRoot, timestamp);

    console.log(`Creating backup: ${backupPath}`);
    await copyDir(sourceDir, backupPath);

    const logPath = path.join(backupRoot, 'backup.log');
    await logBackup(logPath, timestamp);

    await pruneOldBackups(backupRoot);

    console.log('✅ Backup completed.');
  } catch (err) {
    console.error('❌ Backup failed:', err.message);
  }
})();
