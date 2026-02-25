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
                    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
                    dot: 'bg-green-500'
                };
            case TransactionStatus.Failed:
                return {
                    label: 'Failed',
                    classes: 'bg-rose-50 text-rose-700 border-rose-200/60',
                    dot: 'bg-red-500'
                };
            default:
                return {
                    label: 'Pending',
                    classes: 'bg-amber-50 text-amber-700 border-amber-200/60',
                    dot: 'bg-yellow-500'
                };
        }
    }, [status]);

    return (
        <div className={`
            inline-flex items-center gap-2 
            px-2.5 py-0.5 
            rounded-md border 
            text-[11px] font-bold uppercase tracking-wider
            shadow-sm transition-all duration-200
            ${config.classes}
        `}>
            <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`}></span>
            </span>
            {config.label}
        </div>
    );
};

export default React.memo(StatusBadge);