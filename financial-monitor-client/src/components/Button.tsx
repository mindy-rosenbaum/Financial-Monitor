import React, { memo } from 'react';
import { RefreshCw } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    isLoading,
    variant = 'primary',
    icon,
    className,
    ...props
}) => {
    const baseStyles = "w-full py-4 px-6 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50";

    const variants = {
        primary: "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300",
        secondary: "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300",
        danger: "bg-red-600 hover:bg-red-700 disabled:bg-red-300",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? <RefreshCw className="animate-spin" /> : icon}
            {children}
        </button>
    );
};

export default memo(Button);