import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Customer from '@/models/Customer';

// GET /api/customers - 顧客一覧の取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const industry = searchParams.get('industry') || '';
    const status = searchParams.get('status') || '';

    await connectToDatabase();

    // 検索条件の構築
    const filter: any = {};
    if (query) {
      filter.$or = [
        { companyName: { $regex: query, $options: 'i' } },
        { contactName: { $regex: query, $options: 'i' } }
      ];
    }
    if (industry) {
      filter.industry = industry;
    }
    if (status) {
      filter.status = status;
    }

    const customers = await Customer.find(filter)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(customers);
  } catch (error) {
    console.error('顧客一覧の取得に失敗:', error);
    return NextResponse.json(
      { error: '顧客一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST /api/customers - 新規顧客の作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const customer = await Customer.create(body);
    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('顧客の作成に失敗:', error);
    return NextResponse.json(
      { error: '顧客の作成に失敗しました' },
      { status: 500 }
    );
  }
} 