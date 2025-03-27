export interface TransactionType {
  avatar: string;
  name: string;
  category: string;
  date: string;
  amount: number;
  recurring: boolean;
}

export interface BudgetType {
  category: string;
  maximum: number;
  theme: string;
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
