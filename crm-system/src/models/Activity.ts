import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: [true, '顧客は必須です'],
  },
  content: {
    type: String,
    required: [true, '内容は必須です'],
  },
  activityDate: {
    type: Date,
    required: [true, '対応日時は必須です'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'ユーザーは必須です'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema); 