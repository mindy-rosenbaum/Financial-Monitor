import { useEffect, useRef, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../store';
import { addTransaction } from '../store/slices/transactionsSlice';
import type { Transaction } from '../types/Transaction';
import { CONFIG } from '../config';

export const useSignalR = () => {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);
    const connectionRef = useRef<signalR.HubConnection | null>(null);

    useEffect(() => {
        if (connectionRef.current) return;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(CONFIG.HUB_URL)
            .withAutomaticReconnect()
            .build();
        connectionRef.current = connection;
        connection.on("ReceiveTransactionUpdate", (transaction: Transaction) => {
            dispatch(addTransaction(transaction));
        });

        const startConnection = async () => {
            try {
                if (connection.state === signalR.HubConnectionState.Disconnected) {
                    await connection.start();
                    console.log("🚀 SignalR Connected");
                    setIsConnected(true);
                }
            } catch (err) {
                if (err instanceof Error && !err.message.includes("stopped during negotiation")) {
                    console.error('❌ Connection failed: ', err);
                }
            }
        };

        startConnection();

        return () => {
            if (connectionRef.current) {
                const conn = connectionRef.current;
                connectionRef.current = null;

                if (conn.state !== signalR.HubConnectionState.Disconnected) {
                    conn.stop().catch(() => { });
                }
            }
        };

    }, [dispatch]);

    return { isConnected };
};