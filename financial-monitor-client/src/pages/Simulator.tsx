import React, { useState } from 'react';
import { sendTransaction } from '../api/transactionApi';
import { Send, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { TransactionRequest } from '../types/TransactionRequest';

const Simulator: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const generateRandomTransaction = async () => {
        setLoading(true);
        setMessage(null);

        const mockData: TransactionRequest = {
            amount: Math.floor(Math.random() * 1000) + 1, // מספר חיובי
            currency: ['USD', 'ILS', 'EUR'][Math.floor(Math.random() * 3)],
            status: 'Pending',
            timestamp: new Date().toISOString()
        };

        try {
            await sendTransaction(mockData);
            setMessage({ type: 'success', text: 'Transaction sent successfully!' });
        } catch (error: any) {
            // כאן אנחנו תופסים את שגיאות ה-Validation מהשרת
            const errorDetail = error.response?.data?.errors?.Amount?.[0] || 'Server error';
            setMessage({ type: 'error', text: `Failed: ${errorDetail}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                <Send className="text-blue-500" /> Transaction Simulator
            </h2>

            <p className="text-gray-600 mb-8">
                This tool simulates an external system feeding data into your ingestion API.
            </p>

            <button
                onClick={generateRandomTransaction}
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-3 
          ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
            >
                {loading ? <RefreshCw className="animate-spin" /> : <RefreshCw />}
                Generate Mock Transaction
            </button>

            {message && (
                <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                    {message.type === 'success' ? <CheckCircle2 /> : <AlertCircle />}
                    <span>{message.text}</span>
                </div>
            )}
        </div>
    );
};

export default Simulator