import mongoose from 'mongoose';

const potSchema = new mongoose.Schema({
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
    type: String,
    required: true,
  },
});

const Pot = mongoose.models.Pot || mongoose.model('Pot', potSchema);

export default Pot;
