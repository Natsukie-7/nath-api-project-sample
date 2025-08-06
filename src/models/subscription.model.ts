// src/models/subscription.model.ts

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Subscription extends Document {
  name: string;
  price: number;
  currency: 'USD' | 'EUR' | 'BRL';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category:
    | 'sports'
    | 'entertainment'
    | 'education'
    | 'health'
    | 'polityc'
    | 'other';
  paymentMethod:
    | 'credit_card'
    | 'debit_card'
    | 'paypal'
    | 'pix'
    | 'bank_transfer';
  status: 'active' | 'inactive' | 'expired';
  startDate: Date;
  renewalDate: Date;
  user: mongoose.Schema.Types.ObjectId;
}

const subscriptionSchema = new Schema<Subscription>(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price must be greater than 0'],
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'BRL'],
      default: 'BRL',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: true,
      default: 'monthly',
    },
    category: {
      type: String,
      enum: [
        'sports',
        'entertainment',
        'education',
        'health',
        'polityc',
        'other',
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'pix', 'bank_transfer'],
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: 'Start date cannot be in the future',
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator(this: Subscription, value: Date) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after start date',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Lógica para calcular renovação ou expiração automática
subscriptionSchema.pre('save', function (next) {
  const subscription = this as Subscription;

  if (!subscription.renewalDate) {
    const renewalDays = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    const days = renewalDays[subscription.frequency];
    const newDate = new Date(subscription.startDate);
    newDate.setDate(newDate.getDate() + days);

    subscription.renewalDate = newDate;
  } else if (subscription.renewalDate < new Date()) {
    subscription.status = 'expired';
  }

  next();
});

const Subscription: Model<Subscription> = mongoose.model(
  'Subscription',
  subscriptionSchema
);

export default Subscription;
