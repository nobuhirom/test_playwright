import connectDB from './mongoose';
import { User, UserRole } from '../../models';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    await connectDB();

    // 管理者ユーザーの作成
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.findOneAndUpdate(
      { email: 'admin@example.com' },
      {
        name: '管理者',
        email: 'admin@example.com',
        password: adminPassword,
        role: UserRole.ADMIN
      },
      { upsert: true, new: true }
    );

    // 一般ユーザーの作成
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await User.findOneAndUpdate(
      { email: 'user@example.com' },
      {
        name: '一般ユーザー',
        email: 'user@example.com',
        password: userPassword,
        role: UserRole.USER
      },
      { upsert: true, new: true }
    );

    console.log('シードデータの作成が完了しました');
    console.log('管理者:', admin.email);
    console.log('一般ユーザー:', user.email);

    process.exit(0);
  } catch (error) {
    console.error('シードデータの作成中にエラーが発生しました:', error);
    process.exit(1);
  }
}

seed(); 