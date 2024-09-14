import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('Successfully connected to database');
  } catch (e: any) {
    console.log('Database Connection Failed');
    console.log(e.message);
    process.exit(1);
  }
};

export default connectDB;
