import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: 'メールアドレスは必須です' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const user = await User.findOne({ email });
    if (!user) {
      // セキュリティ上の理由で、ユーザーが存在しない場合でも成功レスポンスを返す
      return NextResponse.json(
        { message: 'パスワードリセット用のリンクをメールで送信しました' },
        { status: 200 }
      );
    }

    // リセットトークンの生成
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1時間後

    // ユーザーの更新
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // TODO: メール送信機能の実装
    // ここでは、リセットリンクをコンソールに出力するだけ
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${resetToken}`;
    console.log('Reset URL:', resetUrl);

    return NextResponse.json(
      { message: 'パスワードリセット用のリンクをメールで送信しました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { message: 'サーバーエラーが発生しました' },
      { status: 500 }
    );
  }
} 