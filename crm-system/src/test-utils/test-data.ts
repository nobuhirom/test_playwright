import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import UserModel from '@/models/User'
import CustomerModel from '@/models/Customer'
import ProjectModel from '@/models/Project'
import TaskModel from '@/models/Task'
import ActivityModel from '@/models/Activity'

export const createTestUser = async (data = {}) => {
  const defaultData = {
    name: 'Test User',
    email: 'test@example.com',
    password: await bcrypt.hash('test123', 10),
    role: 'USER',
  }

  return await UserModel.create({ ...defaultData, ...data })
}

export const createTestCustomer = async (data = {}) => {
  const defaultData = {
    companyName: 'Test Company',
    contactName: 'Test Contact',
    email: 'customer@example.com',
    phone: '090-1234-5678',
    address: 'Test Address',
    industry: 'Technology',
    status: 'リード',
    notes: 'Test notes'
  }

  return await CustomerModel.create({ ...defaultData, ...data })
}

export const createTestProject = async (customerId: string, data = {}) => {
  const defaultData = {
    name: 'Test Project',
    description: 'Test Description',
    status: 'planning',
    startDate: new Date(),
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30日後
    customer: customerId,
  }

  return await ProjectModel.create({ ...defaultData, ...data })
}

export const createTestTask = async (projectId: string, assignedTo: string, data = {}) => {
  const defaultData = {
    title: 'Test Task',
    description: 'Test Description',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7日後
    project: projectId,
    assignedTo,
  }

  return await TaskModel.create({ ...defaultData, ...data })
}

export const createTestActivity = async (userId: string, data = {}) => {
  const defaultData = {
    type: 'login',
    description: 'User logged in',
    user: userId,
  }

  return await ActivityModel.create({ ...defaultData, ...data })
}

export const createTestData = async () => {
  const user = await createTestUser()
  const customer = await createTestCustomer()
  const project = await createTestProject(customer._id)
  const task = await createTestTask(project._id, user._id)
  const activity = await createTestActivity(user._id)

  return {
    user,
    customer,
    project,
    task,
    activity,
  }
} 