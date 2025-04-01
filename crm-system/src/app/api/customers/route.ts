import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Customer from '@/models/Customer';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

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
      ];
    }

    if (industry && industry !== 'all') {
      query.industry = industry;
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    const customers = await Customer.find(query)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('顧客一覧の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const customer = await Customer.create({
      ...body,
      assignedTo: session.user.id,
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('顧客の作成に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客の作成に失敗しました' },
      { status: 500 }
    );
  }
} 