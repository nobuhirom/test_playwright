'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCustomerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    email: '',
    industry: '',
    status: 'ACTIVE',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: APIエンドポイントへのデータ送信処理を実装
    console.log('送信データ:', formData);
    router.push('/customers');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              新規顧客登録
            </h1>
            <button
              type="button"
              onClick={() => router.push('/customers')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              戻る
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    会社名
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    担当者名
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    id="contactName"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    電話番号
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    メールアドレス
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    業種
                  </label>
                  <select
                    name="industry"
                    id="industry"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.industry}
                    onChange={handleChange}
                  >
                    <option value="">選択してください</option>
                    <option value="IT">IT</option>
                    <option value="製造">製造</option>
                    <option value="小売">小売</option>
                    <option value="サービス">サービス</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    ステータス
                  </label>
                  <select
                    name="status"
                    id="status"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="ACTIVE">取引中</option>
                    <option value="INACTIVE">取引停止</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 