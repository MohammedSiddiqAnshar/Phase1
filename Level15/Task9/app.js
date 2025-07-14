const fs = require('fs').promises;
const path = require('path');

const NOTES_DIR = path.join(__dirname, 'notes');

const ensureNotesDir = async () => {
  try {
    await fs.mkdir(NOTES_DIR, { recursive: true });
  } catch (err) {
    console.error('Failed to create notes directory:', err.message);
  }
};

const createNote = async (title, content, category = '') => {
  await ensureNotesDir();
  const folder = category ? path.join(NOTES_DIR, category) : NOTES_DIR;
  await fs.mkdir(folder, { recursive: true });

  const filename = `${title}.md`;
  const filePath = path.join(folder, filename);

  await fs.writeFile(filePath, content);
  console.log(`Note created: ${filePath}`);
};

const listNotes = async () => {
  const getFiles = async (dir, files = []) => {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (let entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await getFiles(fullPath, files);
      } else if (entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
    return files;
  };

  const notes = await getFiles(NOTES_DIR);
  notes.forEach((file, idx) => {
    console.log(`${idx + 1}. ${file}`);
  });
};

const viewNote = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    console.log(`\n== ${filePath} ==\n`);
    console.log(content);
  } catch (err) {
    console.error('Error reading note:', err.message);
  }
};

const editNote = async (filePath, newContent) => {
  try {
    await fs.writeFile(filePath, newContent);
    console.log(`Note updated: ${filePath}`);
  } catch (err) {
    console.error('Failed to edit note:', err.message);
  }
};

const deleteNote = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Note deleted: ${filePath}`);
  } catch (err) {
    console.error('Failed to delete note:', err.message);
  }
};

// Simple CLI
const main = async () => {
  const [,, command, ...args] = process.argv;

  switch (command) {
    case 'create':
      await createNote(args[0], args[1], args[2]);
      break;
    case 'list':
      await listNotes();
      break;
    case 'view':
      await viewNote(args[0]);
      break;
    case 'edit':
      await editNote(args[0], args[1]);
      break;
    case 'delete':
      await deleteNote(args[0]);
      break;
    default:
      console.log(`
Usage:
  node app.js create "title" "content" [category]
  node app.js list
  node app.js view <filePath>
  node app.js edit <filePath> "new content"
  node app.js delete <filePath>
      `);
  }
};

main();
