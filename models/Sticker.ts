import mongoose, { Schema, model } from 'mongoose';

const stickerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    tags: {
      type: [String],
    },
  },
  { timestamps: true },
);

const Sticker = mongoose.models?.Sticker || model('Sticker', stickerSchema);

export default Sticker;
