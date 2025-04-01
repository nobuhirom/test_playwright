export const INDUSTRIES = [
  { value: 'IT', label: 'IT' },
  { value: '製造', label: '製造' },
  { value: '小売', label: '小売' },
  { value: 'サービス', label: 'サービス' },
  { value: '金融', label: '金融' },
  { value: '不動産', label: '不動産' },
  { value: '建設', label: '建設' },
  { value: '運輸', label: '運輸' },
  { value: '通信', label: '通信' },
  { value: '教育', label: '教育' },
  { value: '医療', label: '医療' },
  { value: 'その他', label: 'その他' },
] as const;

export type Industry = typeof INDUSTRIES[number]['value']; 