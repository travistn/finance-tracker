import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    expireAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
