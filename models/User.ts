import mongoose, { Schema, model, ObjectId } from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      default: 'user',
    },
    address: {
      type: String,
    },
    cartItems: [
      {
        stickerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Sticker',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.models?.User || model('User', userSchema);

export default User;
