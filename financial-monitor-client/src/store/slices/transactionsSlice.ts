import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Transaction } from '../../types/Transaction';
import { postTransaction } from '../thunks';

interface TransactionsState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
}

const initialState: TransactionsState = {
    items: [],
    loading: false,
    error: null,
};

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.items.unshift(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postTransaction.fulfilled, (state, action) => {
                state.loading = false;
                const newTransaction = action.payload.data;
                const exists = state.items.some(t => t.id === newTransaction.id);
                if (!exists) {
                    state.items.unshift(newTransaction);
                }
            })
            .addCase(postTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;