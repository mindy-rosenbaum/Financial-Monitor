import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import type { Transaction } from '../types/Transaction';

export const useSignalR = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        if (connectionRef.current) return;
        // ודאי שהכתובת תואמת לשרת ה-C# שלך ול-Hub שהגדרנו
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7174/transactionHub', {
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.None)
            .build();

        connectionRef.current = connection;
        // פונקציה פנימית לניהול החיבור
        const start = async () => {
            try {
                await connection.start();
                setIsConnected(true);
                console.log('Connected to SignalR Hub!');
            } catch (err: any) {
                // התעלמות שקטה משגיאות שנובעות מעצירת החיבור בכוונה על ידי React
                if (err.name !== 'AbortError' && !err.message?.includes('stop()')) {
                    console.error('❌ SignalR Error:', err);
                }
            }
        };

        connection.on('ReceiveTransactionUpdate', (transaction: Transaction) => {
            setTransactions(prev => [transaction, ...prev]);
        });

        start();

        return () => {
            if (connectionRef.current === connection) {
                connection.stop().catch(() => { /* התעלמות משגיאות עצירה */ });
                connectionRef.current = null;
                setIsConnected(false);
            }
        };
    }, []);

    return { transactions, isConnected };
};