import { createSelector } from '@reduxjs/toolkit';
import type { Transaction } from '../types/Transaction';
import type { RootState } from '.';

const selectItems = (state: RootState) => state.transactions.items;
const selectFilter = (_state: RootState, filter: string) => filter;

export const selectFilteredTransactions = createSelector(
    [selectItems, selectFilter],
    (items, filter): Transaction[] => {
        if (filter === 'All') return items;
        const filterAsNumber = Number(filter);
        return items.filter((t) => Number(t.status) === filterAsNumber);
    }
);

export const selectTransactionsLoading = (state: RootState) => state.transactions.loading;
export const selectTransactionsError = (state: RootState) => state.transactions.error;