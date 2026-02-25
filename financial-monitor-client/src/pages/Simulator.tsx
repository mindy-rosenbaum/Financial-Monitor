import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import Button from '../components/Button';
import { Send } from 'lucide-react';
import { postTransaction } from '../store/thunks';
import { selectTransactionsError, selectTransactionsLoading } from '../store/selectors';

const Simulator: React.FC = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectTransactionsLoading);
    const error = useAppSelector(selectTransactionsError);

    const handleSend = useCallback(() => {
        const mockData = {
            amount: Math.floor(Math.random() * 1000) + 1,
            currency: 'ILS',
            status: 'Pending',
            timestamp: new Date().toISOString()
        };
        dispatch(postTransaction(mockData));
    }, []);

    return (
        <div className="p-6">
            <Button
                onClick={handleSend}
                isLoading={loading}
                icon={<Send size={18} />}
            >
                Generate Mock Transaction
            </Button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
export default Simulator;