import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, '会社名は必須です'],
    trim: true
  },
  contactName: {
    type: String,
    required: [true, '担当者名は必須です'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, '電話番号は必須です'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'メールアドレスは必須です'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, '有効なメールアドレスを入力してください']
  },
  address: {
    type: String,
    required: [true, '住所は必須です'],
    trim: true
  },
  industry: {
    type: String,
    required: [true, '業種は必須です'],
    trim: true
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE'
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
customerSchema.index({ companyName: 1 });
customerSchema.index({ assignedTo: 1 });

const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

export default Customer; 