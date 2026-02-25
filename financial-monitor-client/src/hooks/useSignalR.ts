import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useAppDispatch } from '../store';
import { addTransaction } from '../store/slices/transactionsSlice';
import type { Transaction } from '../types/Transaction';
import { CONFIG } from '../config';

export const useSignalR = () => {
    const dispatch = useAppDispatch();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let isStopped = false;
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(CONFIG.HUB_URL)
            .withAutomaticReconnect()
            .build();

        connection.on("ReceiveTransactionUpdate", (transaction: Transaction) => {
            console.log("✅ SignalR Message Received:", transaction);
            dispatch(addTransaction(transaction));
        });

        const startConnection = async () => {
            try {
                await connection.start();
                if (!isStopped) {
                    console.log("🚀 SignalR Connected");
                    setIsConnected(true);
                }
            } catch (err) {
                if (!isStopped) {
                    console.error('❌ Connection failed: ', err);
                }
            }
        };

        startConnection();

        return () => {
            isStopped = true;
            connection.stop();
        };

    }, [dispatch]);

    return { isConnected };
};