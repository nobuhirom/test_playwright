import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'タイトルは必須です'],
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, '顧客は必須です'],
  },
  amount: {
    type: Number,
    required: [true, '金額は必須です'],
    min: [0, '金額は0以上である必要があります'],
  },
  probability: {
    type: Number,
    required: [true, '確度は必須です'],
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
    required: [true, '期限は必須です'],
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '担当者は必須です'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema); 