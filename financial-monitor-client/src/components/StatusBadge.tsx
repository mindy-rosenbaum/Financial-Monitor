import React, { useMemo } from 'react';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const style = useMemo(() => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'Failed': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        }
    }, [status]);

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${style}`}>
            {status}
        </span>
    );
};

export default React.memo(StatusBadge);