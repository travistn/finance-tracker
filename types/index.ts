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
