import mongoose from 'mongoose';

const potSchema = new mongoose.Schema({
  amount: {
    type: Number,
  },
  name: {
    type: String,
  },
  target: {
    type: Number,
  },
  theme: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Pot = mongoose.models.Pot || mongoose.model('Pot', potSchema);

export default Pot;
