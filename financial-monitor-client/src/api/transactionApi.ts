import axios from 'axios';
import type { TransactionRequest } from '../types/TransactionRequest';
import type { ApiResponse } from '../types/ApiResponse';
import type { Transaction } from '../types/Transaction';
import { CONFIG } from '../config';


export const sendTransaction = async (transaction: TransactionRequest) => {
    return await axios.post<ApiResponse<Transaction>>(`${CONFIG.API_BASE_URL}/transactions`, transaction);
};