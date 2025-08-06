import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import ENV from '@config/env.ts';
import HttpError from 'utils/httpError.ts';
import User from '../models/user.model.ts';

const { JWT_SECRET, JWT_EXPIRES_IN } = ENV;

interface SignUp {
  name: string;
  email: string;
  password: string;
}
export const signUp: PostRequest<SignUp> = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existsUser = await User.findOne({ email });
    if (existsUser) {
      throw new HttpError({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();
    session.endSession();

    return {
      status: 201,
      message: 'User created successfully',
      data: { user: newUser, token },
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

interface SignIn {
  email: string;
  password: string;
}
export const signIn: PostRequest<SignIn> = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!(user instanceof User)) {
    throw new HttpError({ message: 'User not found', statusCode: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new HttpError({ message: 'Password is incorrect', statusCode: 401 });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    status: 200,
    data: { user, token },
    message: 'User signed in successfully',
  };
};

export const signOut: PostRequest = async (req, res, next) => ({});
