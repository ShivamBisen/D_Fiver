"use client";

import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const AppBar = () => {
    const [isUserMain, setIsUserMain] = useState(false);
    const { publicKey, signMessage } = useWallet();

    useEffect(() => {
        if (!publicKey || !signMessage) return;

        const signAndSend = async () => {
            const message = new TextEncoder().encode("Hello, World!");
            const signature = await signMessage(message);

            const url = isUserMain
                ? "https://dcentralised-fiver-backend.onrender.com/v1/userMain/signin"
                : "https://dcentralised-fiver-backend.onrender.com/v1/user/signin";

            try {
                const response = await axios.post(url, {
                    signature,
                    publicKey: publicKey.toString()
                });
                console.log(response.data);
                localStorage.setItem("token", response.data.token);
            } catch (error) {
                console.error("Error during signin:", error);
            }
        };

        signAndSend();
    }, [publicKey, signMessage, isUserMain]);

    return (
        <div className="flex justify-between w-full p-4">
            <div className="text-2xl font-bold">
                <h1>D Fiver.</h1>
            </div>
            <div>
                <button
                    onClick={() => setIsUserMain(true)}
                    style={{
                        backgroundColor: isUserMain ? 'blue' : 'gray',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        marginRight: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Creator
                </button>
                <button
                    onClick={() => setIsUserMain(false)}
                    style={{
                        backgroundColor: !isUserMain ? 'blue' : 'gray',
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Worker
                </button>
            </div>
            <div className="flex gap-3">
                {!publicKey ? <WalletMultiButton /> : <WalletDisconnectButton />}
            </div>
        </div>
    );
};
