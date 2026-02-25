import { type ReactNode, memo } from 'react';

interface Column<T> {
    header: string;
    key: keyof T | string;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    isLoading?: boolean;
    emptyMessage?: string;
}

const DataTable = <T extends { id: string | number }>({
    columns,
    data,
    isLoading,
    emptyMessage = "No data available"
}: DataTableProps<T>) => {
    return (
        <div className="overflow-hidden bg-white/80 backdrop-blur-md rounded-2xl border border-gray-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">            <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                    {columns.map((col, idx) => (
                        <th key={idx} className="px-6 py-4 text-sm font-semibold text-gray-600">
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {data.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="px-6 py-10 text-center text-gray-400">
                            {isLoading ? "Loading..." : emptyMessage}
                        </td>
                    </tr>
                ) : (
                    data.map((item) => (
                        <tr key={item.id}
                            className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors
                                         animate-row-arrival"
                        > {columns.map((col, idx) => (
                            <td key={idx} className="px-6 py-4">
                                {col.render ? col.render(item) : (item[col.key as keyof T] as unknown as ReactNode)}
                            </td>
                        ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        </div>
    );
};

export default memo(DataTable) as typeof DataTable;