import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    // バリデーション
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: '有効なメールアドレスを入力してください' },
        { status: 400 }
      );
    }

    // パスワードの長さチェック
    if (password.length < 8) {
      return NextResponse.json(
        { message: 'パスワードは8文字以上である必要があります' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // メールアドレスの重複チェック
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'このメールアドレスは既に登録されています' },
        { status: 400 }
      );
    }

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 12);

    // ユーザーの作成
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'USER'
    });

    // パスワードを除外してレスポンスを返す
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error('ユーザー登録エラー:', error);
    return NextResponse.json(
      { message: 'ユーザー登録中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 