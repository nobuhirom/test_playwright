import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const assignedTo = searchParams.get('assignedTo') || '';

    const query: any = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (status && status !== 'all') {
      query.status = status;
    }

    if (assignedTo && assignedTo !== 'all') {
      query.assignedTo = assignedTo;
    }

    const projects = await Project.find(query)
      .populate('customerId', 'companyName contactName')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('プロジェクト一覧の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロジェクト一覧の取得に失敗しました' },
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
    
    // 空の文字列を持つフィールドを削除
    const cleanedData = { ...body };
    Object.keys(cleanedData).forEach(key => {
      if (cleanedData[key] === '') {
        delete cleanedData[key];
      }
    });

    // 日付フィールドの処理
    if (cleanedData.dueDate) {
      try {
        // ISO形式の日付文字列に変換
        cleanedData.dueDate = new Date(cleanedData.dueDate).toISOString();
      } catch (error) {
        console.error('期限の日付変換エラー:', error);
        // エラーが発生した場合は元の値を使用
      }
    }

    const project = await Project.create({
      ...cleanedData,
      assignedTo: cleanedData.assignedTo || session.user.id,
      createdBy: session.user.id,
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('プロジェクトの作成に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロジェクトの作成に失敗しました' },
      { status: 500 }
    );
  }
} 