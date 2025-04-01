import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'タイトルは必須です'],
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  amount: {
    type: Number,
    min: [0, '金額は0以上である必要があります'],
  },
  probability: {
    type: Number,
    min: [0, '確度は0以上である必要があります'],
    max: [100, '確度は100以下である必要があります'],
  },
  status: {
    type: String,
    enum: ['PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'],
    default: 'PROPOSAL',
  },
  dueDate: {
    type: Date,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

projectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 