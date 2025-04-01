/// <reference types="node" />
import mongoose from 'mongoose';
import type { Global } from '@types/node';

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

declare const process: {
  env: {
    DATABASE_URL?: string;
  };
};

const MONGODB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/crm-system';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URIが設定されていません。');
}

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (!cached) {
    throw new Error('キャッシュが初期化されていません。');
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDBに接続しました');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB; 