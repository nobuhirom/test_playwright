import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// グローバルなモックの設定
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// テスト用の環境変数
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000/api'
process.env.MONGODB_URI = 'mongodb://localhost:27017/crm-test'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder 