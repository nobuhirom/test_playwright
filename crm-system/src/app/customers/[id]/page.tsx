'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// 仮のデータ
const customer = {
  id: 1,
  companyName: '株式会社ABC',
  contactName: '山田太郎',
  phone: '03-1234-5678',
  email: 'yamada@abc.co.jp',
  industry: 'IT',
  status: 'ACTIVE',
  address: '東京都渋谷区○○町1-2-3',
  createdAt: '2024-01-01',
  updatedAt: '2024-03-15',
};

const projects = [
  {
    id: 1,
    title: 'Webサイトリニューアル',
    amount: 5000000,
    status: 'PROPOSAL',
    dueDate: '2024-06-30',
  },
  {
    id: 2,
    title: 'システム保守契約',
    amount: 2000000,
    status: 'WON',
    dueDate: '2024-12-31',
  },
];

const activities = [
  {
    id: 1,
    content: '初回商談実施',
    activityDate: '2024-03-15',
    userId: 1,
  },
  {
    id: 2,
    content: '提案書送付',
    activityDate: '2024-03-10',
    userId: 1,
  },
];

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('info');

  const handleDelete = async () => {
    if (window.confirm('この顧客を削除してもよろしいですか？')) {
      // TODO: 削除APIの実装
      console.log('顧客を削除:', params.id);
      router.push('/customers');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* ヘッダー */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {customer.companyName}
            </h1>
            <div className="flex space-x-3">
              <Link
                href={`/customers/${params.id}/edit`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                編集
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                削除
              </button>
            </div>
          </div>

          {/* ステータスバー */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    customer.status === 'ACTIVE'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}
                >
                  {customer.status === 'ACTIVE' ? '取引中' : '取引停止'}
                </span>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                登録日: {customer.createdAt}
              </div>
            </div>
          </div>

          {/* タブ */}
          <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'info', name: '基本情報' },
                { id: 'projects', name: '関連案件' },
                { id: 'activities', name: '活動履歴' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* タブコンテンツ */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
            {activeTab === 'info' && (
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      担当者名
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {customer.contactName}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      電話番号
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {customer.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      メールアドレス
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {customer.email}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      業種
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {customer.industry}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      住所
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                      {customer.address}
                    </dd>
                  </div>
                </dl>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    関連案件
                  </h2>
                  <Link
                    href={`/customers/${params.id}/projects/new`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    新規案件登録
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          案件名
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          金額
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          ステータス
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          期限
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {project.title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ¥{project.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                project.status === 'WON'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : project.status === 'PROPOSAL'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}
                            >
                              {project.status === 'WON'
                                ? '成約'
                                : project.status === 'PROPOSAL'
                                ? '提案中'
                                : '失注'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {project.dueDate}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    活動履歴
                  </h2>
                  <Link
                    href={`/customers/${params.id}/activities/new`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    活動記録
                  </Link>
                </div>
                <div className="flow-root">
                  <ul className="-mb-8">
                    {activities.map((activity, index) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {index !== activities.length - 1 && (
                            <span
                              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
                              aria-hidden="true"
                            />
                          )}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center ring-8 ring-white dark:ring-gray-800">
                                <svg
                                  className="h-5 w-5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                  />
                                </svg>
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {activity.content}
                                </p>
                                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                                  {activity.activityDate}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 