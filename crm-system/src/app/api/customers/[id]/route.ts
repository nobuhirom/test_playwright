import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Customer from '@/models/Customer';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    await dbConnect();

    const customer = await Customer.findById(params.id).populate(
      'assignedTo',
      'name email'
    );

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('顧客詳細の取得に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    await dbConnect();

    const body = await request.json();
    const customer = await Customer.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true }
    ).populate('assignedTo', 'name email');

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('顧客の更新に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客の更新に失敗しました' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    await dbConnect();

    const customer = await Customer.findByIdAndDelete(params.id);

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '顧客を削除しました' });
  } catch (error) {
    console.error('顧客の削除に失敗しました:', error);
    return NextResponse.json(
      { error: '顧客の削除に失敗しました' },
      { status: 500 }
    );
  }
} 