import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

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

    const project = await Project.findById(params.id)
      .populate('customerId', 'companyName contactName')
      .populate('assignedTo', 'name email');

    if (!project) {
      return NextResponse.json(
        { error: 'プロジェクトが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('プロジェクト詳細の取得に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロジェクト詳細の取得に失敗しました' },
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

    const project = await Project.findByIdAndUpdate(
      params.id,
      cleanedData,
      { new: true, runValidators: true }
    );

    if (!project) {
      return NextResponse.json(
        { error: 'プロジェクトが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error('プロジェクトの更新に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロジェクトの更新に失敗しました' },
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

    const project = await Project.findByIdAndDelete(params.id);

    if (!project) {
      return NextResponse.json(
        { error: 'プロジェクトが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'プロジェクトを削除しました' });
  } catch (error) {
    console.error('プロジェクトの削除に失敗しました:', error);
    return NextResponse.json(
      { error: 'プロジェクトの削除に失敗しました' },
      { status: 500 }
    );
  }
} 