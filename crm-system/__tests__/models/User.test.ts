import { connectTestDB, closeTestDB, clearTestDB } from '@/test-utils/test-db'
import { createTestUser } from '@/test-utils/test-data'
import mongoose from 'mongoose'
import UserModel from '@/models/User'

describe('User Model Test Suite', () => {
  beforeAll(async () => {
    await connectTestDB()
  })

  afterAll(async () => {
    await closeTestDB()
  })

  afterEach(async () => {
    await clearTestDB()
  })

  it('should create & save user successfully', async () => {
    const validUser = await createTestUser()
    expect(validUser._id).toBeDefined()
    expect(validUser.name).toBe('Test User')
    expect(validUser.email).toBe('test@example.com')
    expect(validUser.role).toBe('USER')
  })

  it('should fail to save user without required fields', async () => {
    const userWithoutRequiredField = new UserModel({ name: 'Test User' })
    let err
    try {
      await userWithoutRequiredField.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should fail to save user with invalid email format', async () => {
    let err
    try {
      await createTestUser({ email: 'invalid-email' })
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should fail to save user with password less than 6 characters', async () => {
    let err
    try {
      await createTestUser({ password: '12345' })
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should fail to save user with invalid role', async () => {
    let err
    try {
      await createTestUser({ role: 'INVALID_ROLE' })
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should update updatedAt timestamp on save', async () => {
    const user = await createTestUser()
    const originalUpdatedAt = user.updatedAt
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機
    user.name = 'Updated Name'
    await user.save()
    expect(user.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime())
  })
}) 