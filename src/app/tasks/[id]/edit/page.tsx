'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
  description: 'ECサイトの要件定義書を作成する。\n主な要件：\n- ユーザー認証機能\n- 商品検索機能\n- カート機能\n- 決済機能'
};

const mockProjects = [
  { id: '1', title: 'ECサイト構築プロジェクト' },
  { id: '2', title: '基幹システム刷新プロジェクト' },
  { id: '3', title: 'モバイルアプリ開発プロジェクト' }
];

const mockUsers = [
  { id: '1', name: '山田太郎' },
  { id: '2', name: '鈴木花子' },
  { id: '3', name: '佐藤一郎' }
];

export default function EditTaskPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: mockTask.title,
    projectId: mockTask.projectId,
    dueDate: mockTask.dueDate,
    status: mockTask.status,
    assignedTo: mockTask.assignedTo,
    description: mockTask.description
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = 'タスク名は必須です';
    }
    if (!formData.projectId) {
      newErrors.projectId = '案件は必須です';
    }
    if (!formData.dueDate) {
      newErrors.dueDate = '期限は必須です';
    }
    if (!formData.assignedTo) {
      newErrors.assignedTo = '担当者は必須です';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // TODO: APIエンドポイントへのデータ送信
    console.log('更新データ:', formData);
    
    // タスク詳細ページへリダイレクト
    router.push(`/tasks/${params.id}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">タスク編集</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タスク名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              案件 <span className="text-red-500">*</span>
            </label>
            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.projectId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">案件を選択してください</option>
              {mockProjects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
            {errors.projectId && (
              <p className="mt-1 text-sm text-red-500">{errors.projectId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              期限 <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.dueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.dueDate && (
              <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ステータス <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="TODO">未着手</option>
              <option value="IN_PROGRESS">進行中</option>
              <option value="DONE">完了</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              担当者 <span className="text-red-500">*</span>
            </label>
            <select
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.assignedTo ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">担当者を選択してください</option>
              {mockUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.assignedTo && (
              <p className="mt-1 text-sm text-red-500">{errors.assignedTo}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              タスクの説明
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push(`/tasks/${params.id}`)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 