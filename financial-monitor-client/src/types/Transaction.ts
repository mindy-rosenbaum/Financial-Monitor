export type TransactionStatus = 'Pending' | 'Completed' | 'Failed';

export interface Transaction {
    id: string;
    amount: number;
    currency: string;
    status: TransactionStatus;
    timestamp: string;
}