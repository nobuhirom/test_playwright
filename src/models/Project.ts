import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, '案件名は必須です'],
    trim: true
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, '顧客は必須です']
  },
  amount: {
    type: Number,
    required: [true, '金額は必須です'],
    min: [0, '金額は0以上である必要があります']
  },
  probability: {
    type: Number,
    required: [true, '確度は必須です'],
    min: [0, '確度は0以上である必要があります'],
    max: [100, '確度は100以下である必要があります']
  },
  status: {
    type: String,
    enum: ['PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'],
    default: 'PROPOSAL'
  },
  dueDate: {
    type: Date,
    required: [true, '期限は必須です']
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '担当者は必須です']
  }
}, {
  timestamps: true
});

// インデックスの作成
projectSchema.index({ customerId: 1 });
projectSchema.index({ assignedTo: 1 });
projectSchema.index({ status: 1 });

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project; 