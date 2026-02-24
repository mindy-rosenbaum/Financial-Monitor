export interface TransactionRequest {
    transactionId?: string;
    amount: number;
    currency: string;
    status: string;
    timestamp: string;
}