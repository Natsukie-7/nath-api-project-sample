import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100,
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
      required: [true, 'Subscription frequency is required'],
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
      required: [true, 'Subscription category is required'],
    },

    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'pix', 'bank_transfer'],
      required: [true, 'Payment method is required'],
      trim: true,
    },

    status: {
      type: String,
      enum: ['active', 'inactive', 'expired'],
      default: 'active',
    },

    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Start date cannot be in the past',
      },
    },

    reneawlDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after start date',
      },
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
      index: true,
    },
  },
  { timeStamps: true }
);

subscriptionSchema.pre('save', function (next) {
  // Auto-calculate renewal date
  if (!this.reneawlDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.reneawlDate = new Date(this.startDate);
    this.reneawlDate.setDate(
      this.reneawlDate.getDate() + renewalPeriods[this.frequency]
    );
  } else if (this.reneawlDate < new Date()) {
    // Auto update if renew date has passed

    this.status = 'expired';
  }

  next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
