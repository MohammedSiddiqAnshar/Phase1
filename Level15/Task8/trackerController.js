const connectDB = require('./db');
const { ObjectId } = require('mongodb');

// Add transaction
const addTransaction = async ({ type, amount, category, date }) => {
  const db = await connectDB();
  if (!['income', 'expense'].includes(type)) return console.log("Invalid type.");
  if (!amount || isNaN(amount)) return console.log("Invalid amount.");
  await db.insertOne({ type, amount: parseFloat(amount), category, date: new Date(date) });
  console.log("Transaction added.");
};

// View all or filtered transactions
const listTransactions = async ({ from, to, category }) => {
  const db = await connectDB();
  const query = {};
  if (from || to) {
    query.date = {};
    if (from) query.date.$gte = new Date(from);
    if (to) query.date.$lte = new Date(to);
  }
  if (category) query.category = category;

  const transactions = await db.find(query).toArray();
  console.table(transactions);
};

// Report summary
const generateReport = async () => {
  const db = await connectDB();
  const agg = await db.aggregate([
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ]).toArray();

  const summary = { income: 0, expense: 0 };
  agg.forEach(({ _id, total }) => {
    summary[_id] = total;
  });
  summary.balance = summary.income - summary.expense;
  console.log("Summary:", summary);
};

// Delete transaction
const deleteTransaction = async (id) => {
  const db = await connectDB();
  await db.deleteOne({ _id: new ObjectId(id) });
  console.log("Transaction deleted.");
};

module.exports = {
  addTransaction,
  listTransactions,
  generateReport,
  deleteTransaction,
};
