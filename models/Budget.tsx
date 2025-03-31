import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  maximum: {
    type: Number,
  },
  theme: {
    type: String,
  },
});

const Budget = mongoose.models.Budget || mongoose.model('Budget', budgetSchema);

export default Budget;
