import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Customer from '@/models/Customer';
import mongoose from 'mongoose';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const industry = searchParams.get('industry') || '';
    const status = searchParams.get('status') || '';

    const query: any = {};

    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { contactName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (industry) {
      query.industry = industry;
    }

    if (status) {
      query.status = status;
    }

    const customers = await Customer.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('顧客の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    await dbConnect();

    const data = await request.json();

    // 必須フィールドのチェック
    if (!data.companyName) {
      return NextResponse.json(
        {
          error: '会社名は必須です',
        },
        { status: 400 }
      );
    }

    // セッション情報のログ出力
    console.log('POST - セッション情報:', session);

    // ユーザーIDの取得
    const userId = session?.sub || session?.user?.id;
    if (!userId) {
      console.error('ユーザーIDが見つかりません:', session);
      return NextResponse.json(
        {
          error: 'ユーザー情報が見つかりません',
        },
        { status: 401 }
      );
    }

    // データの前処理
    const customerData = {
      ...data,
      assignedTo: new mongoose.Types.ObjectId(userId),
      email: data.email || '',
      address: data.address || '',
      industry: data.industry || '',
      status: data.status || 'リード',
    };

    const customer = await Customer.create(customerData);

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('顧客の作成に失敗しました:', error);
    
    // エラーの種類に応じて適切なレスポンスを返す
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        { 
          error: 'バリデーションエラー',
          details: Object.values(error.errors).map(err => err.message)
        },
        { status: 400 }
      );
    }

    if (error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        { 
          error: '無効なデータ形式',
          details: error.message
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: '顧客の作成に失敗しました',
        details: error instanceof Error ? error.message : '不明なエラー'
      },
      { status: 500 }
    );
  }
} 