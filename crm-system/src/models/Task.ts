import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'タイトルは必須です'],
  },
  description: {
    type: String,
    required: [true, '説明は必須です'],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  dueDate: {
    type: Date,
    required: [true, '期限は必須です'],
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, '担当者は必須です'],
  },
}, {
  timestamps: true,
});

export default mongoose.models.Task || mongoose.model('Task', taskSchema); 