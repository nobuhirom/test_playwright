import { connectTestDB, closeTestDB, clearTestDB } from '@/test-utils/test-db'
import { createTestCustomer } from '@/test-utils/test-data'
import mongoose from 'mongoose'
import CustomerModel from '@/models/Customer'

describe('Customer Model Test Suite', () => {
  beforeAll(async () => {
    await connectTestDB()
  })

  afterAll(async () => {
    await closeTestDB()
  })

  afterEach(async () => {
    await clearTestDB()
  })

  it('should create & save customer successfully', async () => {
    const validCustomer = await createTestCustomer()
    expect(validCustomer._id).toBeDefined()
    expect(validCustomer.companyName).toBe('Test Company')
    expect(validCustomer.contactName).toBe('Test Contact')
    expect(validCustomer.email).toBe('customer@example.com')
    expect(validCustomer.phone).toBe('090-1234-5678')
    expect(validCustomer.industry).toBe('Technology')
    expect(validCustomer.status).toBe('リード')
  })

  it('should fail to save customer without required fields', async () => {
    const customerWithoutRequiredField = new CustomerModel({})
    let err
    try {
      await customerWithoutRequiredField.save()
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(err.errors.companyName).toBeDefined()
  })

  it('should fail to save customer with invalid email format', async () => {
    let err
    try {
      await createTestCustomer({ email: 'invalid-email' })
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should fail to save customer with invalid status', async () => {
    let err
    try {
      await createTestCustomer({ status: 'invalid-status' })
    } catch (error) {
      err = error
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
  })

  it('should update updatedAt timestamp on save', async () => {
    const customer = await createTestCustomer()
    const originalUpdatedAt = customer.updatedAt
    await new Promise(resolve => setTimeout(resolve, 1000)) // 1秒待機
    customer.companyName = 'Updated Company'
    await customer.save()
    expect(customer.updatedAt.getTime()).toBeGreaterThan(originalUpdatedAt.getTime())
  })
}) 