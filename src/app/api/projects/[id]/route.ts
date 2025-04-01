import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Project from '@/models/Project';

// GET /api/projects/[id] - 案件詳細の取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const project = await Project.findById(params.id)
      .populate('customerId', 'companyName')
      .populate('assignedTo', 'name')
      .lean();

    if (!project) {
      return NextResponse.json(
        { error: '案件が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('案件詳細の取得に失敗:', error);
    return NextResponse.json(
      { error: '案件詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT /api/projects/[id] - 案件情報の更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const project = await Project.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    )
      .populate('customerId', 'companyName')
      .populate('assignedTo', 'name')
      .lean();

    if (!project) {
      return NextResponse.json(
        { error: '案件が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('案件情報の更新に失敗:', error);
    return NextResponse.json(
      { error: '案件情報の更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - 案件の削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const project = await Project.findByIdAndDelete(params.id).lean();

    if (!project) {
      return NextResponse.json(
        { error: '案件が見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: '案件を削除しました' });
  } catch (error) {
    console.error('案件の削除に失敗:', error);
    return NextResponse.json(
      { error: '案件の削除に失敗しました' },
      { status: 500 }
    );
  }
} 