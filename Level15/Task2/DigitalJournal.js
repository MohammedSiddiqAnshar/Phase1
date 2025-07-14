
const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);
const dbName = 'journalDB';

async function connect() {
  await client.connect();
  return client.db(dbName).collection('entries');
}


async function createEntry({ title, content, date = new Date(), tags = [] }) {
  const collection = await connect();
  const result = await collection.insertOne({ title, content, date, tags });
  console.log('Entry created with ID:', result.insertedId);
}


async function viewEntries() {
  const collection = await connect();
  const entries = await collection.find().toArray();
  console.log(entries);
}


async function searchEntries({ title, date, tag }) {
  const collection = await connect();
  const query = {};

  if (title) query.title = { $regex: title, $options: 'i' };
  if (date) query.date = { $gte: new Date(date) };
  if (tag) query.tags = tag;

  const entries = await collection.find(query).toArray();
  console.log(entries);
}


async function updateEntry(id, updates) {
  const collection = await connect();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  console.log(`${result.modifiedCount} entry updated.`);
}


async function deleteEntry(id) {
  const collection = await connect();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  console.log(`${result.deletedCount} entry deleted.`);
}

// Example usage 
// createEntry({ title: 'Day 1', content: 'Started journaling!', tags: ['personal', 'start'] });
// viewEntries();
// searchEntries({ title: 'Day' });
//updateEntry('67f4c60c5c28d65d99fc9ff1', { title: 'Today Task' });
// deleteEntry('ENTRY_ID_HERE');

module.exports = { createEntry, viewEntries, searchEntries, updateEntry, deleteEntry };
