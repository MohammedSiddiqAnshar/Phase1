const fs = require('fs').promises;
const path = require('path');

const TASKS_FILE = path.join(__dirname, 'tasks.json');


const readTasks = async () => {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw new Error('Failed to read tasks file.');
  }
};


const writeTasks = async (tasks) => {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw new Error('Failed to write tasks file.');
  }
};


const addTask = async ({ title, description }) => {
  const tasks = await readTasks();
  const newTask = {
    id: Date.now().toString(),
    title,
    description,
    status: 'pending'
  };
  tasks.push(newTask);
  await writeTasks(tasks);
  console.log(`Task added: ${title}`);
};


const listTasks = async (filterStatus = null) => {
  const tasks = await readTasks();
  const filtered = filterStatus ? tasks.filter(t => t.status === filterStatus) : tasks;
  filtered.forEach(({ id, title, status }, index) => {
    console.log(`${index + 1}. [${status}] ${title} (ID: ${id})`);
  });
};


const updateTask = async (id, updates) => {
  const tasks = await readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return console.log('Task not found.');
  Object.assign(task, updates);
  await writeTasks(tasks);
  console.log(`Task updated: ${task.title}`);
};


const deleteTask = async (id) => {
  let tasks = await readTasks();
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === initialLength) return console.log('Task not found.');
  await writeTasks(tasks);
  console.log(`Task with ID ${id} deleted.`);
};


const main = async () => {
  const [,, command, ...args] = process.argv;

  try {
    switch (command) {
      case 'add': {
        const [title, description] = args;
        if (!title || !description) return console.log('Provide title and description.');
        await addTask({ title, description });
        break;
      }
      case 'list': {
        const [status] = args;
        await listTasks(status);
        break;
      }
      case 'update': {
        const [id, key, value] = args;
        if (!id || !key || !value) return console.log('Provide id, key and value.');
        await updateTask(id, { [key]: value });
        break;
      }
      case 'delete': {
        const [id] = args;
        if (!id) return console.log('Provide id.');
        await deleteTask(id);
        break;
      }
      default:
        console.log(`Usage:
  node taskManager.js add "Title" "Description"
  node taskManager.js list [status]
  node taskManager.js update <id> <field> <value>
  node taskManager.js delete <id>`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  }
};

main();
