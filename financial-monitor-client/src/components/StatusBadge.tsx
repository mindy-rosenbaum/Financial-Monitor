import React, { useMemo } from 'react';
import { TransactionStatus } from '../types/TransactionStatus';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const config = useMemo(() => {
        const s = Number(status);

        console.log("Status received in badge:", s);

        switch (s) {
            case TransactionStatus.Completed:
                return {
                    label: 'Completed',
                    classes: 'bg-green-50 text-green-700 border-green-200',
                    dot: 'bg-green-500'
                };
            case TransactionStatus.Failed:
                return {
                    label: 'Failed',
                    classes: 'bg-red-50 text-red-700 border-red-200',
                    dot: 'bg-red-500'
                };
            default:
                return {
                    label: 'Pending',
                    classes: 'bg-yellow-50 text-yellow-700 border-yellow-200',
                    dot: 'bg-yellow-500'
                };
        }
    }, [status]);

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${config.classes}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
};

export default React.memo(StatusBadge);