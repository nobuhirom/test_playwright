import mongoose from 'mongoose';

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseConnection | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/crm-system';

if (!MONGODB_URI) {
  throw new Error('MONGODB_URIが設定されていません。');
}

if (!global.mongoose) {
  global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function connectDB() {
  if (!global.mongoose) {
    throw new Error('mongooseの初期化に失敗しました。');
  }

  if (global.mongoose.conn) {
    console.log('MongoDB: 既存の接続を使用します');
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    console.log('MongoDB: 新しい接続を作成します');
    const opts = {
      bufferCommands: false,
    };

    global.mongoose.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    global.mongoose.conn = await global.mongoose.promise;
    console.log('MongoDB: 接続に成功しました');
  } catch (error) {
    console.error('MongoDB: 接続に失敗しました:', error);
    throw error;
  }

  return global.mongoose.conn;
} 