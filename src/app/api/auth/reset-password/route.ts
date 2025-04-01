import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { message: 'トークンとパスワードは必須です' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
      return NextResponse.json(
        { message: '無効なトークンまたは期限切れです' },
        { status: 400 }
      );
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12);

    // パスワードの更新とリセットトークンのクリア
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: 'パスワードを更新しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('パスワード更新エラー:', error);
    return NextResponse.json(
      { message: 'パスワードの更新中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 