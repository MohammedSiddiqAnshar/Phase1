const { addTransaction, listTransactions, generateReport, deleteTransaction } = require('./trackerController');

const [,, command, ...args] = process.argv;

(async () => {
  switch (command) {
    case 'add':
      const [type, amount, category, date] = args;
      await addTransaction({ type, amount, category, date });
      break;

    case 'list':
      const filters = {};
      args.forEach(arg => {
        const [key, value] = arg.split('=');
        filters[key] = value;
      });
      await listTransactions(filters);
      break;

    case 'report':
      await generateReport();
      break;

    case 'delete':
      const [id] = args;
      await deleteTransaction(id);
      break;

    default:
      console.log(`
Usage:
  node tracker.js add <type> <amount> <category> <YYYY-MM-DD>
  node tracker.js list from=YYYY-MM-DD to=YYYY-MM-DD category=Food
  node tracker.js report
  node tracker.js delete <id>
      `);
  }
})();
