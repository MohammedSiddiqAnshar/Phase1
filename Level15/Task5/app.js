const readline = require('readline-sync');
const {
  addContact,
  listContacts,
  searchContacts,
  updateContact,
  deleteContact
} = require('./contacts');

const main = async () => {
  const command = readline.question('Enter command (add, list, search, update, delete): ');

  switch (command) {
    case 'add':
      const name = readline.question('Name: ');
      const phone = readline.question('Phone: ');
      const email = readline.questionEMail('Email: ');
      const address = readline.question('Address: ');
      const group = readline.question('Group (optional): ');
      await addContact({ name, phone, email, address, group });
      break;

    case 'list':
      await listContacts();
      break;

    case 'search':
      const field = readline.question('Search by (name/email/phone): ');
      const value = readline.question('Value: ');
      await searchContacts(field, value);
      break;

    case 'update':
      const target = readline.question('Contact name to update: ');
      const key = readline.question('Field to update (name/email/phone/address): ');
      const val = readline.question('New value: ');
      await updateContact(target, { [key]: val });
      break;

    case 'delete':
      const delName = readline.question('Contact name to delete: ');
      await deleteContact(delName);
      break;

    default:
      console.log('Invalid command');
  }

  process.exit();
};

main();
