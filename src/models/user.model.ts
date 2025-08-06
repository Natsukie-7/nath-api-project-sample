// src/models/user.model.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'User name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [50, 'Name must be at most 50 characters'],
    },
    email: {
      type: String,
      required: [true, 'User email is required'],
      unique: true,
      trim: true,
      minlength: [2, 'Email must be at least 2 characters'],
      maxlength: [50, 'Email must be at most 50 characters'],
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      minlength: [4, 'Password must be at least 4 characters'],
    },
  },
  {
    timestamps: true, // ✅ Corrigido
  }
);

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
