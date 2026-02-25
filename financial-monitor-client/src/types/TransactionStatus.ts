export const TransactionStatus = {
    Pending: 0,
    Completed: 1,
    Failed: 2
} as const;

export type TransactionStatusType = typeof TransactionStatus[keyof typeof TransactionStatus];