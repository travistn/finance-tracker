import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  name: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
  amount: {
    type: Number,
  },
  recurring: {
    type: Boolean,
  },
});

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema);

export default Transaction;
