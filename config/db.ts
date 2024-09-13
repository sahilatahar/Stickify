import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Successfully connected to database');
  } catch (e: unknown) {
    console.log('Database Connection Failed');
    process.exit(1);
  }
};

export default connectDB;
