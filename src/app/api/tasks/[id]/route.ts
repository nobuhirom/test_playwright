import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';

// GET /api/tasks/[id] - タスク詳細の取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const task = await Task.findById(params.id)
      .populate('projectId', 'title')
      .populate('assignedTo', 'name')
      .lean();

    if (!task) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error('タスク詳細の取得に失敗:', error);
    return NextResponse.json(
      { error: 'タスク詳細の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// PUT /api/tasks/[id] - タスク情報の更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const task = await Task.findByIdAndUpdate(
      params.id,
      { $set: body },
      { new: true, runValidators: true }
    )
      .populate('projectId', 'title')
      .populate('assignedTo', 'name')
      .lean();

    if (!task) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error('タスク情報の更新に失敗:', error);
    return NextResponse.json(
      { error: 'タスク情報の更新に失敗しました' },
      { status: 500 }
    );
  }
}

// DELETE /api/tasks/[id] - タスクの削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();
    const task = await Task.findByIdAndDelete(params.id).lean();

    if (!task) {
      return NextResponse.json(
        { error: 'タスクが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'タスクを削除しました' });
  } catch (error) {
    console.error('タスクの削除に失敗:', error);
    return NextResponse.json(
      { error: 'タスクの削除に失敗しました' },
      { status: 500 }
    );
  }
} 