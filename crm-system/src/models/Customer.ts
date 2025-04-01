import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, '会社名は必須です'],
  },
  contactName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    match: [/^\S+@\S+\.\S+$/, '有効なメールアドレスを入力してください'],
    default: '',
  },
  address: {
    type: String,
    required: false,
    default: '',
  },
  industry: {
    type: String,
    required: false,
    default: '',
  },
  status: {
    type: String,
    enum: ['リード', '商談中', '成約', '失注'],
    default: 'リード',
  },
  notes: {
    type: String,
    required: false,
    default: '',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema); 