import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongod: MongoMemoryServer

export const connectTestDB = async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  await mongoose.connect(uri)
}

export const closeTestDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

export const clearTestDB = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
} 