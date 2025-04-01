import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: 'メールアドレスは必須です' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'このメールアドレスは登録されていません' },
        { status: 404 }
      );
    }

    // リセットトークンの生成
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24時間有効

    // ユーザーにリセットトークンを保存
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // メール送信
    const emailSent = await sendPasswordResetEmail(email, resetToken);
    if (!emailSent) {
      return NextResponse.json(
        { message: 'メールの送信に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'パスワードリセットのメールを送信しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('パスワードリセットエラー:', error);
    return NextResponse.json(
      { message: 'パスワードリセット中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 