import React, { useState } from 'react';
import { useSignalR } from '../hooks/useSignalR';
import { Activity, Filter } from 'lucide-react';

const Dashboard: React.FC = () => {
    const { transactions, isConnected } = useSignalR();
    const [filter, setFilter] = useState<string>('All');

    // פילטור הנתונים בצד הלקוח (Client-side filtering)
    const filteredTransactions = transactions.filter(t =>
        filter === 'All' || t.status === filter
    );

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <Activity className="text-blue-600" /> Live Transaction Monitor
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-sm text-gray-500">{isConnected ? 'Live' : 'Disconnected'}</span>
                    </div>
                </div>

                {/* פילטרים */}
                <div className="flex items-center gap-3">
                    <Filter size={18} className="text-gray-400" />
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Transactions</option>
                        <option value="Completed">Success Only</option>
                        <option value="Failed">Errors Only</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* טבלה */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Amount</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Timestamp</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-10 text-center text-gray-400">
                                    Waiting for transactions...
                                </td>
                            </tr>
                        ) : (
                            filteredTransactions.map((t) => (
                                <tr key={t.id} className="hover:bg-gray-50 transition-colors animate-in fade-in slide-in-from-left-2">
                                    <td className="px-6 py-4 text-xs font-mono text-gray-500">{t.id.substring(0, 8)}...</td>
                                    <td className="px-6 py-4 font-bold text-gray-900">{t.amount} {t.currency}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(t.status)}`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(t.timestamp).toLocaleTimeString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;