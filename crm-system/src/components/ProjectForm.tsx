'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState, useEffect } from 'react';

const projectSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  customerId: z.string().optional(),
  amount: z.coerce.number().min(0, '金額は0以上である必要があります').optional(),
  probability: z.coerce.number().min(0, '確度は0以上である必要があります').max(100, '確度は100以下である必要があります').optional(),
  status: z.enum(['PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']).default('PROPOSAL'),
  dueDate: z.string().optional(),
  assignedTo: z.string().optional(),
  description: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

interface Customer {
  _id: string;
  companyName: string;
}

interface User {
  _id: string;
  name: string;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => void;
  submitLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export default function ProjectForm({
  initialData = {},
  onSubmit,
  submitLabel,
  cancelLabel,
  onCancel,
  isSubmitting = false,
}: ProjectFormProps) {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: initialData.title || '',
      customerId: initialData.customerId || '',
      amount: initialData.amount || undefined,
      probability: initialData.probability || undefined,
      status: initialData.status || 'PROPOSAL',
      dueDate: initialData.dueDate || '',
      assignedTo: initialData.assignedTo || '',
      description: initialData.description || '',
    },
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/api/customers');
        if (response.ok) {
          const data = await response.json();
          setCustomers(data);
        }
      } catch (error) {
        console.error('顧客データの取得に失敗しました:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error('ユーザーデータの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
    fetchUsers();
  }, []);

  // initialDataが変更された場合に値を再設定
  useEffect(() => {
    if (initialData.customerId) {
      setValue('customerId', initialData.customerId);
    }
    if (initialData.assignedTo) {
      setValue('assignedTo', initialData.assignedTo);
    }
    if (initialData.status) {
      setValue('status', initialData.status);
    }
  }, [initialData, setValue]);

  const onStatusChange = (value: string) => {
    setValue('status', value as any);
  };

  if (isLoading) {
    return <div>データを読み込み中...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">
            タイトル <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            {...register('title')}
            className={errors.title ? 'border-red-500' : ''}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerId">顧客</Label>
          <select
            id="customerId"
            {...register('customerId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={initialData.customerId || ''}
          >
            <option value="">顧客を選択してください</option>
            {customers.map((customer) => (
              <option key={customer._id} value={customer._id}>
                {customer.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">金額</Label>
          <Input
            id="amount"
            type="number"
            {...register('amount')}
            className={errors.amount ? 'border-red-500' : ''}
          />
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="probability">確度 (%)</Label>
          <Input
            id="probability"
            type="number"
            min="0"
            max="100"
            {...register('probability')}
            className={errors.probability ? 'border-red-500' : ''}
          />
          {errors.probability && (
            <p className="text-red-500 text-sm mt-1">{errors.probability.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">ステータス</Label>
          <Select onValueChange={onStatusChange} defaultValue={initialData.status || 'PROPOSAL'}>
            <SelectTrigger>
              <SelectValue placeholder="ステータスを選択" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PROPOSAL">提案中</SelectItem>
              <SelectItem value="NEGOTIATION">交渉中</SelectItem>
              <SelectItem value="WON">成約</SelectItem>
              <SelectItem value="LOST">失注</SelectItem>
            </SelectContent>
          </Select>
          <input type="hidden" {...register('status')} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">期限</Label>
          <Input
            id="dueDate"
            type="date"
            {...register('dueDate')}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignedTo">担当者</Label>
          <select
            id="assignedTo"
            {...register('assignedTo')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            defaultValue={initialData.assignedTo || ''}
          >
            <option value="">担当者を選択してください</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">説明</Label>
          <Textarea
            id="description"
            {...register('description')}
            rows={5}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {cancelLabel}
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '処理中...' : submitLabel}
        </Button>
      </div>
    </form>
  );
} 