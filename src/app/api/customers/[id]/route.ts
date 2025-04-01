import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Customer from '@/models/Customer';

// GET /api/customers/[id] - 顧客詳細の取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const customer = await Customer.findById(params.id).lean();

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('顧客詳細の取得に失敗:', error);
    return NextResponse.json(
      { error: '顧客詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT /api/customers/[id] - 顧客情報の更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const customer = await Customer.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    ).lean();

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    console.error('顧客情報の更新に失敗:', error);
    return NextResponse.json(
      { error: '顧客情報の更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE /api/customers/[id] - 顧客の削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const customer = await Customer.findByIdAndDelete(params.id).lean();

    if (!customer) {
      return NextResponse.json(
        { error: '顧客が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '顧客を削除しました' });
  } catch (error) {
    console.error('顧客の削除に失敗:', error);
    return NextResponse.json(
      { error: '顧客の削除に失敗しました' },
      { status: 500 }
    );
  }
} 