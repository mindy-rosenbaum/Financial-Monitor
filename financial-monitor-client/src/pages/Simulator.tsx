import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import Button from '../components/Button';
import { Send } from 'lucide-react';
import { postTransaction } from '../store/thunks';
import { selectTransactionsError, selectTransactionsLoading } from '../store/selectors';
import toast, { Toaster } from 'react-hot-toast';

const Simulator: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectTransactionsLoading);
    const error = useAppSelector(selectTransactionsError);

    const handleSend = useCallback(async () => {
        const statuses = ['Completed', 'Failed', 'Pending'];
        const currencies = ['ILS', 'USD', 'EUR'];

        const mockData = {
            amount: Math.floor(Math.random() * 1000) + 1,
            currency: currencies[Math.floor(Math.random() * currencies.length)],
            status: statuses[Math.floor(Math.random() * statuses.length)],
            timestamp: new Date().toISOString()
        };

        try {
            await toast.promise(
                dispatch(postTransaction(mockData)).unwrap(),
                {
                    loading: 'Sending to ingestion engine...',
                    success: <b>Transaction created! 🚀</b>,
                    error: <b>Could not save transaction.</b>,
                }
            );
        } catch (e) {
        }
    }, [dispatch]);

    return (
        <div className="p-10 flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100">
            <Toaster position="bottom-right" />

            <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-gray-800">Mock Data Generator</h2>
                <p className="text-sm text-gray-500">Simulate external system feeding data</p>
            </div>

            <Button
                onClick={handleSend}
                isLoading={loading}
                icon={<Send size={18} />}>Push Random Transaction
            </Button>
        </div>
    );
};
export default Simulator;