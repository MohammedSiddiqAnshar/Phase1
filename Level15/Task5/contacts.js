const connectDB = require('./config/db');

const addContact = async (contact) => {
  const collection = await connectDB();
  await collection.insertOne(contact);
  console.log('✅ Contact added.');
};

const listContacts = async () => {
  const collection = await connectDB();
  const contacts = await collection.find().toArray();
  contacts.forEach(c => {
    console.log(`${c.name} - ${c.phone} - ${c.email}`);
  });
};

const searchContacts = async (field, value) => {
  const collection = await connectDB();
  const result = await collection.find({ [field]: value }).toArray();
  console.log('🔍 Search Results:');
  console.log(result);
};

const updateContact = async (name, update) => {
  const collection = await connectDB();
  const res = await collection.updateOne({ name }, { $set: update });
  if (res.modifiedCount > 0) console.log('✅ Contact updated.');
  else console.log('❌ Contact not found.');
};

const deleteContact = async (name) => {
  const collection = await connectDB();
  const res = await collection.deleteOne({ name });
  if (res.deletedCount > 0) console.log('🗑️ Contact deleted.');
  else console.log('❌ Contact not found.');
};

module.exports = { addContact, listContacts, searchContacts, updateContact, deleteContact };
