import React from "react";
import { PrivyProvider } from "@privy-io/react-auth";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";

export interface BoomWalletProviderProps {
    children: React.ReactNode;
}

export default function BoomWalletProvider({ children }: BoomWalletProviderProps) {
    const solanaConnectors = toSolanaWalletConnectors({
        // By default, shouldAutoConnect is enabled
        shouldAutoConnect: false,
    });

    return (
        <PrivyProvider
            appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ""}
            config={{
                appearance: {
                    accentColor: "#6A6FF5",
                    theme: "#fbe9e9",
                    logo: undefined,
                    landingHeader: "Connect wallet",
                    showWalletLoginFirst: false, // 是否有限展示钱包链接的方式
                    loginMessage: "Welcome to the app",
                    walletChainType: "solana-only", // 展示支持链的钱包类型
                    walletList: ["phantom", "metamask", "okx_wallet"], // 可以选择的钱包列表 WalletListEntry
                },
                // Display email and wallet as login methods
                loginMethods: ["email", "wallet", "google", "apple", "github", "discord"],
                fundingMethodConfig: {
                    moonpay: {
                        useSandbox: true,
                    },
                },
                externalWallets: {
                    solana: {
                        connectors: solanaConnectors,
                    },
                },
                // Create embedded wallets for users who don't have a wallet
                embeddedWallets: {
                    createOnLogin: "all-users",
                    showWalletUIs: false,
                    // createOnLogin: 'off',
                    // requireUserPasswordOnCreate: false,
                },
                mfa: {
                    noPromptOnMfaRequired: false,
                },
                // supportedChains: [solana],
            }}
        >
            {children}
        </PrivyProvider>
    );
}
