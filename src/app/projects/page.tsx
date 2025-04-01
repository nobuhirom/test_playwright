'use client';

import { useState } from 'react';
import Link from 'next/link';

// モックデータ
const mockProjects = [
  {
    id: '1',
    title: 'ECサイト構築プロジェクト',
    customerName: '株式会社ABC',
    amount: 5000000,
    probability: 80,
    status: 'NEGOTIATION',
    dueDate: '2024-06-30',
    assignedTo: '山田太郎'
  },
  {
    id: '2',
    title: '社内システムリニューアル',
    customerName: '株式会社XYZ',
    amount: 3000000,
    probability: 60,
    status: 'PROPOSAL',
    dueDate: '2024-07-15',
    assignedTo: '鈴木花子'
  },
  {
    id: '3',
    title: 'モバイルアプリ開発',
    customerName: '株式会社123',
    amount: 8000000,
    probability: 90,
    status: 'WON',
    dueDate: '2024-08-20',
    assignedTo: '佐藤一郎'
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

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [amountFilter, setAmountFilter] = useState('all');

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesAmount = amountFilter === 'all' || 
                         (amountFilter === 'small' && project.amount < 5000000) ||
                         (amountFilter === 'medium' && project.amount >= 5000000 && project.amount < 10000000) ||
                         (amountFilter === 'large' && project.amount >= 10000000);
    return matchesSearch && matchesStatus && matchesAmount;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">案件管理</h1>
        <Link
          href="/projects/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          新規案件登録
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              検索
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="案件名または顧客名で検索"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ステータス
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">すべて</option>
              <option value="PROPOSAL">提案中</option>
              <option value="NEGOTIATION">交渉中</option>
              <option value="WON">成約</option>
              <option value="LOST">失注</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              金額
            </label>
            <select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">すべて</option>
              <option value="small">500万円未満</option>
              <option value="medium">500万円以上1000万円未満</option>
              <option value="large">1000万円以上</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                案件名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                顧客名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                金額
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                確度
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ステータス
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                期限
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                担当者
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/projects/${project.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {project.title}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.amount.toLocaleString()}円
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.probability}%
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[project.status]}`}>
                    {statusLabels[project.status]}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(project.dueDate).toLocaleDateString('ja-JP')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.assignedTo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 