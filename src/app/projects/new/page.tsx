'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// モックデータ
const mockCustomers = [
  { id: '1', name: '株式会社ABC' },
  { id: '2', name: '株式会社XYZ' },
  { id: '3', name: '株式会社123' }
];

const mockUsers = [
  { id: '1', name: '山田太郎' },
  { id: '2', name: '鈴木花子' },
  { id: '3', name: '佐藤一郎' }
];

export default function NewProjectPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    customerId: '',
    amount: '',
    probability: '',
    status: 'PROPOSAL',
    dueDate: '',
    assignedTo: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title) {
      newErrors.title = '案件名は必須です';
    }
    if (!formData.customerId) {
      newErrors.customerId = '顧客は必須です';
    }
    if (!formData.amount) {
      newErrors.amount = '金額は必須です';
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = '有効な金額を入力してください';
    }
    if (!formData.probability) {
      newErrors.probability = '確度は必須です';
    } else if (isNaN(Number(formData.probability)) || Number(formData.probability) < 0 || Number(formData.probability) > 100) {
      newErrors.probability = '0から100の間の数値を入力してください';
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
    console.log('送信データ:', formData);
    
    // 案件一覧ページへリダイレクト
    router.push('/projects');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">新規案件登録</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              案件名 <span className="text-red-500">*</span>
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
              顧客 <span className="text-red-500">*</span>
            </label>
            <select
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.customerId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">顧客を選択してください</option>
              {mockCustomers.map(customer => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            {errors.customerId && (
              <p className="mt-1 text-sm text-red-500">{errors.customerId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              金額（円） <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              確度（%） <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="probability"
              value={formData.probability}
              onChange={handleChange}
              min="0"
              max="100"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.probability ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.probability && (
              <p className="mt-1 text-sm text-red-500">{errors.probability}</p>
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
              <option value="PROPOSAL">提案中</option>
              <option value="NEGOTIATION">交渉中</option>
              <option value="WON">成約</option>
              <option value="LOST">失注</option>
            </select>
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/projects')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              登録
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 