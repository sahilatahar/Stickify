import mongoose, { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    imageUrls: [
      {
        type: String,
        required: true,
      },
    ],
    stickerType: {
      type: String,
      enum: ['Personalized', 'Pre-designed'],
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.models?.Order || model('Order', orderSchema);

export default Order;
