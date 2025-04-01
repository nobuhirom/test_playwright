'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProjectForm, { ProjectFormData } from '@/components/ProjectForm';
import { toast } from 'sonner';

export default function NewProjectPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProjectFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'プロジェクトの作成に失敗しました');
      }

      toast.success('プロジェクトを作成しました');
      router.push('/projects');
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      toast.error('プロジェクトの作成に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              新規プロジェクト作成
            </h1>
            <button
              type="button"
              onClick={() => router.push('/projects')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              戻る
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md">
                {error}
              </div>
            )}

            <ProjectForm
              onSubmit={onSubmit}
              submitLabel="作成"
              cancelLabel="キャンセル"
              onCancel={() => router.push('/projects')}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 