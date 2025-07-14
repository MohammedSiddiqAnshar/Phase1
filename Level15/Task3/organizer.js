const fs = require('fs').promises;
const path = require('path');
const chokidar = require('chokidar'); 

const CATEGORIES = {
  images: ['.jpg', '.jpeg', '.png', '.gif'],
  documents: ['.pdf', '.docx', '.txt', '.xlsx'],
  videos: ['.mp4', '.mkv', '.avi'],
  code: ['.js', '.py', '.java', '.html'],
  others: []
};


const getCategory = (ext) => {
  for (const [category, extensions] of Object.entries(CATEGORIES)) {
    if (extensions.includes(ext)) return category;
  }
  return 'others';
};


const organizeFiles = async (dirPath) => {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  const report = [];

  for (const entry of entries) {
    if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      const category = getCategory(ext);
      const targetDir = path.join(dirPath, category);
      const oldPath = path.join(dirPath, entry.name);
      const newPath = path.join(targetDir, entry.name);

      
      try {
        await fs.mkdir(targetDir, { recursive: true });
      } catch {}

      
      await fs.rename(oldPath, newPath);
      report.push(`Moved: ${entry.name} → ${category}/`);
    }
  }

  console.log('--- Organizing Complete ---');
  report.forEach(r => console.log(r));
};


const watchMode = (dirPath) => {
  const watcher = chokidar.watch(dirPath, { ignoreInitial: true });

  console.log(`Watching for changes in: ${dirPath}`);

  watcher.on('add', async (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);
    const category = getCategory(ext);
    const targetDir = path.join(path.dirname(filePath), category);
    const newPath = path.join(targetDir, fileName);

    try {
      await fs.mkdir(targetDir, { recursive: true });
      await fs.rename(filePath, newPath);
      console.log(`Moved new file: ${fileName} → ${category}/`);
    } catch (err) {
      console.error(`Failed to move ${fileName}:`, err.message);
    }
  });
};


const [,, dir, mode] = process.argv;

if (!dir) {
  console.log('Usage: node organizer.js <directory_path> [watch]');
  process.exit(1);
}

if (mode === 'watch') {
  watchMode(dir);
} else {
  organizeFiles(dir);
}
