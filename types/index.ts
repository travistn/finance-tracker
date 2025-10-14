export interface TransactionType {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface BudgetType {
  _id?: string;
  category: string;
  maximum: number;
  theme: string;
  userId: string;
}

export interface PotType {
  _id?: string;
  name: string;
  target: number;
  theme: string;
  userId: string;
  amount?: number;
}

export interface ThemeType {
  green: string;
  yellow: string;
  cyan: string;
  navy: string;
  red: string;
  purple: string;
  turquoise: string;
  orange: string;
  blue: string;
  magenta: string;
}

export interface ColorType {
  name: string;
  used: boolean;
}
