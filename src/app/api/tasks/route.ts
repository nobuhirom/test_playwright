import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Task from '@/models/Task';

// GET /api/tasks - タスク一覧の取得
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const status = searchParams.get('status') || '';
    const assignedTo = searchParams.get('assignedTo') || '';

    await connectToDatabase();

    // 検索条件の構築
    const filter: any = {};
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { 'project.title': { $regex: query, $options: 'i' } }
      ];
    }
    if (status) {
      filter.status = status;
    }
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    const tasks = await Task.find(filter)
      .populate('projectId', 'title')
      .populate('assignedTo', 'name')
      .sort({ dueDate: 1 })
      .lean();

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('タスク一覧の取得に失敗:', error);
    return NextResponse.json(
      { error: 'タスク一覧の取得に失敗しました' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - 新規タスクの作成
export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();

    const task = await Task.create(body);
    await task.populate('projectId', 'title');
    await task.populate('assignedTo', 'name');

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('タスクの作成に失敗:', error);
    return NextResponse.json(
      { error: 'タスクの作成に失敗しました' },
      { status: 500 }
    );
  }
} 