'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProjectForm, { ProjectFormData } from '@/components/ProjectForm';
import { toast } from 'sonner';

interface Project {
  _id: string;
  title: string;
  customerId?: {
    _id: string;
    companyName: string;
    contactName?: string;
  };
  amount?: number;
  probability?: number;
  status: 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  dueDate?: string;
  assignedTo?: {
    _id: string;
    name: string;
    email: string;
  };
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${params.id}`);
        if (!response.ok) {
          throw new Error('プロジェクトの取得に失敗しました');
        }
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
        toast.error('プロジェクトの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const onSubmit = async (data: ProjectFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'プロジェクトの更新に失敗しました');
      }

      toast.success('プロジェクトを更新しました');
      router.push(`/projects/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      toast.error('プロジェクトの更新に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">読み込み中...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">プロジェクトが見つかりません</div>
      </div>
    );
  }

  const initialData: Partial<ProjectFormData> = {
    title: project.title,
    customerId: project.customerId?._id,
    amount: project.amount,
    probability: project.probability,
    status: project.status,
    dueDate: project.dueDate ? new Date(project.dueDate).toISOString().split('T')[0] : undefined,
    assignedTo: project.assignedTo?._id,
    description: project.description,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              プロジェクト編集
            </h1>
            <button
              type="button"
              onClick={() => router.push(`/projects/${params.id}`)}
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
              initialData={initialData}
              onSubmit={onSubmit}
              submitLabel="更新"
              cancelLabel="キャンセル"
              onCancel={() => router.push(`/projects/${params.id}`)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 