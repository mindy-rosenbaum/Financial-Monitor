import axios from 'axios';
import type { TransactionRequest } from '../types/TransactionRequest';


const API_URL = 'https://localhost:7174/api/transactions';

export const sendTransaction = async (transaction: TransactionRequest) => {
    return await axios.post(API_URL, transaction);
};