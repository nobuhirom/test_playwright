'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// モックデータ
const mockTask = {
  id: '1',
  title: '要件定義書の作成',
  projectId: '1',
  projectTitle: 'ECサイト構築プロジェクト',
  dueDate: '2024-04-15',
  status: 'IN_PROGRESS',
  assignedTo: '1',
  assignedToName: '山田太郎',
  description: 'ECサイトの要件定義書を作成する。\n主な要件：\n- ユーザー認証機能\n- 商品検索機能\n- カート機能\n- 決済機能',
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-20T15:30:00Z'
};

const mockUsers = [
  { id: '1', name: '山田太郎' },
  { id: '2', name: '鈴木花子' },
  { id: '3', name: '佐藤一郎' }
];

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [task, setTask] = useState(mockTask);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-gray-100 text-gray-800';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800';
      case 'DONE':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'TODO':
        return '未着手';
      case 'IN_PROGRESS':
        return '進行中';
      case 'DONE':
        return '完了';
      default:
        return status;
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    // TODO: APIエンドポイントへのステータス更新
    console.log('ステータス更新:', newStatus);
    setTask(prev => ({ ...prev, status: newStatus }));
  };

  const handleDelete = async () => {
    // TODO: APIエンドポイントへの削除リクエスト
    console.log('タスク削除:', task.id);
    router.push('/tasks');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">タスク詳細</h1>
          <div className="flex space-x-4">
            <Link
              href={`/tasks/${params.id}/edit`}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              編集
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              削除
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">{task.title}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                {getStatusText(task.status)}
              </span>
            </div>
          </div>

          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">案件</h3>
                <Link
                  href={`/projects/${task.projectId}`}
                  className="mt-1 text-blue-600 hover:text-blue-900"
                >
                  {task.projectTitle}
                </Link>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">担当者</h3>
                <p className="mt-1 text-gray-900">{task.assignedToName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">期限</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(task.dueDate).toLocaleDateString('ja-JP')}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
                <div className="mt-1">
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="TODO">未着手</option>
                    <option value="IN_PROGRESS">進行中</option>
                    <option value="DONE">完了</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">タスクの説明</h3>
                <div className="mt-1 text-gray-900 whitespace-pre-line">
                  {task.description}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">作成日時</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(task.createdAt).toLocaleString('ja-JP')}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">更新日時</h3>
                <p className="mt-1 text-gray-900">
                  {new Date(task.updatedAt).toLocaleString('ja-JP')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 削除確認モーダル */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">タスクの削除</h3>
            <p className="text-gray-600 mb-6">
              このタスクを削除してもよろしいですか？この操作は取り消すことができません。
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                削除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 