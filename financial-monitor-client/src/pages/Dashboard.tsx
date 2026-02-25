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
        <div className="min-h-screen bg-gray-50/50 p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Live Monitor</h1>
                        <p className="text-gray-500 text-sm mt-1">Real-time transaction stream from ingestion engine</p>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-full border border-gray-200 shadow-sm">
                        <span className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[11px] font-semibold uppercase text-gray-600 tracking-wide">
                            {isConnected ? 'System Live' : 'Offline'}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h1 className="text-2xl font-bold">Monitor</h1>
                    <div className="relative group">
                        <select
                            value={filter}
                            onChange={handleFilterChange}
                            className="
                                    appearance-none cursor-pointer
                                    bg-white border border-gray-100
                                    pl-5 pr-12 py-2.5 rounded-2xl 
                                    text-sm font-semibold text-gray-700
                                    shadow-sm hover:border-gray-300
                                    focus:outline-none focus:ring-4 focus:ring-blue-50/50
                                    transition-all duration-300">
                            <option value="All">All Transactions</option>
                            <option value="1">Success</option>
                            <option value="2">Failed</option>
                            <option value="0">Pending</option>
                        </select>
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
                            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                <DataTable columns={columns} data={transactions} />
            </div>
        </div>
    );
};
export default Dashboard;