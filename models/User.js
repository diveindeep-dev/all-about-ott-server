import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    mail: { type: String, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    otts: [
      new mongoose.Schema({
        name: { type: String, required: true },
        price: { type: Number, required: true },
        billing_date: { type: Number, required: true },
      }),
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

userSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 10, function (err, hashed) {
      if (err) return next(err);
      user.password = hashed;
      next();
    });
  } else {
    next();
  }
});

export default mongoose.model('User', userSchema);
