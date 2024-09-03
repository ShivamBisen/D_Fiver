'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
import '@solana/wallet-adapter-react-ui/styles.css';
import { AppBar } from "./components/AppBar";
const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = "https://solana-devnet.g.alchemy.com/v2/sleiRD8-KgsQ_uHYmWkD095z6E8wmSaP";

  const wallets = useMemo(
      () => [  ],
      
      [network]
  );

  return (
    <html lang="en">
      <body className= {inter.className}>
      <ConnectionProvider endpoint={endpoint}>
              <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                      
                      <AppBar />
                        {children}
          
                  </WalletModalProvider>
              </WalletProvider>
          </ConnectionProvider>
        </body>
    </html>
  );
}
