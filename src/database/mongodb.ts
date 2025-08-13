import ENV from '@config/env';
import mongoose from 'mongoose';

const { DB_URI, NODE_ENV } = ENV;

if (!DB_URI) {
  throw new Error(
    'DB_URI is not defined in the environment variables, please define the MONGODB_URI enviroment variable inside .env.<development|production>.local file'
  );
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to Database in ${NODE_ENV} mode `);
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1);
  }
};

export default connectToDatabase;
