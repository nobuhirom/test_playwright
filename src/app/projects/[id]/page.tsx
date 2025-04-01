'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// モックデータ
const mockProject = {
  id: '1',
  title: 'ECサイト構築プロジェクト',
  customerName: '株式会社ABC',
  amount: 5000000,
  probability: 80,
  status: 'NEGOTIATION',
  dueDate: '2024-06-30',
  assignedTo: '山田太郎',
  description: '既存のECサイトを最新の技術スタックでリニューアルするプロジェクト。\n主な機能：\n- 商品管理システムの刷新\n- 決済システムの統合\n- 在庫管理システムの改善',
  createdAt: '2024-03-01',
  updatedAt: '2024-03-15'
};

const mockTasks = [
  {
    id: '1',
    title: '要件定義書の作成',
    status: 'IN_PROGRESS',
    dueDate: '2024-03-20',
    assignedTo: '山田太郎'
  },
  {
    id: '2',
    title: '技術選定の検討',
    status: 'TODO',
    dueDate: '2024-03-25',
    assignedTo: '鈴木花子'
  },
  {
    id: '3',
    title: '見積もり書の作成',
    status: 'DONE',
    dueDate: '2024-03-10',
    assignedTo: '佐藤一郎'
  }
];

const mockActivities = [
  {
    id: '1',
    content: '初回ミーティングを実施。要件のヒアリングを行いました。',
    date: '2024-03-01',
    user: '山田太郎'
  },
  {
    id: '2',
    content: '提案書を送付。概算見積もりを提示しました。',
    date: '2024-03-05',
    user: '鈴木花子'
  },
  {
    id: '3',
    content: '技術検討会を実施。使用するフレームワークを決定しました。',
    date: '2024-03-15',
    user: '佐藤一郎'
  }
];

const statusColors = {
  PROPOSAL: 'bg-blue-100 text-blue-800',
  NEGOTIATION: 'bg-yellow-100 text-yellow-800',
  WON: 'bg-green-100 text-green-800',
  LOST: 'bg-red-100 text-red-800'
};

const statusLabels = {
  PROPOSAL: '提案中',
  NEGOTIATION: '交渉中',
  WON: '成約',
  LOST: '失注'
};

const taskStatusColors = {
  TODO: 'bg-gray-100 text-gray-800',
  IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
  DONE: 'bg-green-100 text-green-800'
};

const taskStatusLabels = {
  TODO: '未着手',
  IN_PROGRESS: '進行中',
  DONE: '完了'
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');

  const handleDelete = () => {
    if (window.confirm('この案件を削除してもよろしいですか？')) {
      // TODO: APIエンドポイントへの削除リクエスト
      console.log('案件を削除:', params.id);
      router.push('/projects');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{mockProject.title}</h1>
        <div className="space-x-4">
          <Link
            href={`/projects/${params.id}/edit`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            編集
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            削除
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('info')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'info'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              基本情報
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              関連タスク
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'activities'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              活動履歴
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">顧客名</h3>
                  <p className="mt-1 text-sm text-gray-900">{mockProject.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">金額</h3>
                  <p className="mt-1 text-sm text-gray-900">{mockProject.amount.toLocaleString()}円</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">確度</h3>
                  <p className="mt-1 text-sm text-gray-900">{mockProject.probability}%</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">ステータス</h3>
                  <span className={`mt-1 inline-flex px-2 text-xs font-semibold rounded-full ${statusColors[mockProject.status]}`}>
                    {statusLabels[mockProject.status]}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">期限</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(mockProject.dueDate).toLocaleDateString('ja-JP')}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">担当者</h3>
                  <p className="mt-1 text-sm text-gray-900">{mockProject.assignedTo}</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">案件概要</h3>
                <p className="mt-1 text-sm text-gray-900 whitespace-pre-line">{mockProject.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">関連タスク</h3>
                <Link
                  href={`/projects/${params.id}/tasks/new`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  新規タスク登録
                </Link>
              </div>
              <div className="space-y-4">
                {mockTasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                        <p className="mt-1 text-sm text-gray-500">
                          期限: {new Date(task.dueDate).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className={`px-2 text-xs font-semibold rounded-full ${taskStatusColors[task.status]}`}>
                          {taskStatusLabels[task.status]}
                        </span>
                        <span className="text-sm text-gray-500">{task.assignedTo}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">活動履歴</h3>
                <Link
                  href={`/projects/${params.id}/activities/new`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  活動記録追加
                </Link>
              </div>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white border rounded-lg p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm text-gray-900">{activity.content}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString('ja-JP')}
                        </p>
                      </div>
                      <span className="text-sm text-gray-500">{activity.user}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 