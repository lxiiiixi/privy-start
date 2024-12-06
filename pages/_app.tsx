import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { addRpcUrlOverrideToChain, PrivyProvider } from "@privy-io/react-auth";
import { solana } from "../utils/chian";

function MyApp({ Component, pageProps }: AppProps) {
    const solanaConnectors = toSolanaWalletConnectors({
        // By default, shouldAutoConnect is enabled
        shouldAutoConnect: false,
    });

    return (
        <>
            <Head>
                <link
                    rel="preload"
                    href="/fonts/AdelleSans-Regular.woff"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/AdelleSans-Regular.woff2"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/AdelleSans-Semibold.woff"
                    as="font"
                    crossOrigin=""
                />
                <link
                    rel="preload"
                    href="/fonts/AdelleSans-Semibold.woff2"
                    as="font"
                    crossOrigin=""
                />

                <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicons/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
                <link rel="manifest" href="/favicons/manifest.json" />

                <title>Privy Auth Starter</title>
                <meta name="description" content="Privy Auth Starter" />
            </Head>
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
                        // createOnLogin: 'off',
                        // requireUserPasswordOnCreate: false,
                    },
                    mfa: {
                        noPromptOnMfaRequired: false,
                    },
                    // supportedChains: [solana],
                }}
            >
                <Component {...pageProps} />
            </PrivyProvider>
        </>
    );
}

export default MyApp;
