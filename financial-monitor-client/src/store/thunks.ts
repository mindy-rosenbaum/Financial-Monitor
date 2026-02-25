import { createAsyncThunk } from '@reduxjs/toolkit';
import { sendTransaction } from '../api/transactionApi';
import type { TransactionRequest } from '../types/TransactionRequest';

export const postTransaction = createAsyncThunk(
    'transactions/postTransaction',
    async (transactionData: TransactionRequest, { rejectWithValue }) => {
        try {
            const response = await sendTransaction(transactionData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.errors?.Amount?.[0] || 'Server error');
        }
    }
);