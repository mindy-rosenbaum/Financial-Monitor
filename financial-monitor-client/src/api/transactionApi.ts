import axios from 'axios';
import type { TransactionRequest } from '../types/TransactionRequest';
import type { ApiResponse } from '../types/ApiResponse';
import type { Transaction } from '../types/Transaction';


const API_URL = 'https://localhost:7174/api/transactions';

export const sendTransaction = async (transaction: TransactionRequest) => {
    return await axios.post<ApiResponse<Transaction>>(API_URL, transaction);
};