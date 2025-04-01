import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';

// GET /api/projects - 案件一覧の取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || '';
    const amount = searchParams.get('amount') || '';

    await connectToDatabase();

    // 検索条件の構築
    const filter: any = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { 'customer.companyName': { $regex: query, $options: 'i' } }
      ];
    }
    if (status) {
      filter.status = status;
    }
    if (amount) {
      switch (amount) {
        case 'under5':
          filter.amount = { $lt: 5000000 };
          break;
        case '5to10':
          filter.amount = { $gte: 5000000, $lt: 10000000 };
          break;
        case 'over10':
          filter.amount = { $gte: 10000000 };
          break;
      }
    }

    const projects = await Project.find(filter)
      .populate('customerId', 'companyName')
      .populate('assignedTo', 'name')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(projects);
  } catch (error) {
    console.error('案件一覧の取得に失敗:', error);
    return NextResponse.json(
      { error: '案件一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST /api/projects - 新規案件の作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const project = await Project.create(body);
    await project.populate('customerId', 'companyName');
    await project.populate('assignedTo', 'name');

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('案件の作成に失敗:', error);
    return NextResponse.json(
      { error: '案件の作成に失敗しました' },
      { status: 500 }
    );
  }
} 