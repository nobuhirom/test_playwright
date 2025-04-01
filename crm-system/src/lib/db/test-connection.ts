import mongoose from 'mongoose';
import dotenv from 'dotenv';

// 環境変数を読み込む
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URIが設定されていません');
  process.exit(1);
}

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log('データベース接続に成功しました');
    process.exit(0);
  } catch (error) {
    console.error('データベース接続に失敗しました:', error);
    process.exit(1);
  }
}

testConnection(); 