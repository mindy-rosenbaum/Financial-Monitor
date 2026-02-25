import React, { useCallback, useMemo, useState } from 'react';
import type { Transaction } from '../types/Transaction';
import StatusBadge from '../components/StatusBadge';
import DataTable from '../components/Table';
import { useAppSelector } from '../store';
import { selectFilteredTransactions } from '../store/selectors';
import { useSignalR } from '../hooks/useSignalR';

const Dashboard: React.FC = () => {
    const [filter, setFilter] = useState('All');
    const { isConnected } = useSignalR();
    const transactions = useAppSelector(state => selectFilteredTransactions(state, filter));


    const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilter(e.target.value);
    }, []);

    const columns = useMemo(() => [
        {
            header: 'ID',
            key: 'id',
            render: (t: Transaction) => <span className="text-xs font-mono text-gray-500">{t.id.substring(0, 8)}...</span>
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (t: Transaction) => <span className="font-bold">{t.amount} {t.currency}</span>
        },
        {
            header: 'Status',
            key: 'status',
            render: (t: Transaction) => <StatusBadge status={t.status} />
        },
        {
            header: 'Timestamp',
            key: 'timestamp',
            render: (t: Transaction) => <span className="text-sm text-gray-500">{new Date(t.timestamp).toLocaleTimeString()}</span>
        },
    ], []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h1 className="text-2xl font-bold">Monitor</h1>
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="border p-2 rounded">
                    <option value="All">All Transactions</option>
                    <option value="Completed">Success Only</option>
                    <option value="Failed">Errors Only</option>
                    <option value="Pending">Pending</option>
                </select>
            </div>
            <DataTable columns={columns} data={transactions} />
        </div>
    );
};
export default Dashboard;