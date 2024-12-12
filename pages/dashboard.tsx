import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAccessToken, useSolanaWallets } from "@privy-io/react-auth";
import Head from "next/head";
import { useBoomWallet } from "boom-wallet-sdk";

async function verifyToken() {
    const url = "/api/verify";
    const accessToken = await getAccessToken(); // 本质上也就是存在浏览器的这个 cookie
    console.log("🚀 ~ verifyToken ~ accessToken:", accessToken);
    const result = await fetch(url, {
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined),
        },
    });

    return await result.json();
}

async function signMessage() {
    const url = "/api/signMessageForUser";
    const accessToken = await getAccessToken();
    console.log("🚀 ~ signMessage ~ accessToken:", accessToken);
    const result = await fetch(url, {
        headers: {
            ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined),
        },
    });

    return await result.json();
}

// 身份令牌（Identity Token）：包含当前认证用户的详细信息，适用于在任何时候获取用户信息。
// 访问令牌（Access Token）：用于验证用户的认证状态，应该在后端接收到请求时进行验证，确认请求是来自经过认证的用户。

export default function DashboardPage() {
    const [verifyResult, setVerifyResult] = useState();
    const router = useRouter();
    const { ready, authenticated, user, logout } = useBoomWallet();
    console.log("🚀 ~ DashboardPage ~ user:", user);

    const { createWallet, wallets: solanaWallet } = useSolanaWallets();

    console.log("🚀 ~ DashboardPage ~ solanaWallet:", solanaWallet);

    useEffect(() => {
        if (ready && !authenticated) {
            router.push("/");
        }
    }, [ready, authenticated, router]);

    return (
        <>
            <Head>
                <title>Privy Auth Demo</title>
            </Head>

            <main className="flex flex-col min-h-screen px-4 sm:px-20 py-6 sm:py-10 bg-privy-light-blue">
                {ready && authenticated ? (
                    <>
                        <div className="flex flex-row justify-between">
                            <h1 className="text-2xl font-semibold">Privy Auth Demo</h1>
                            <button
                                onClick={logout}
                                className="text-sm bg-violet-200 hover:text-violet-900 py-2 px-4 rounded-md text-violet-700"
                            >
                                Logout
                            </button>
                        </div>
                        <div className="mt-12 flex gap-4 flex-wrap">
                            <details className="w-full">
                                <summary className="mt-6 font-bold uppercase text-sm text-gray-600">
                                    User object
                                </summary>
                                <pre className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2">
                                    {JSON.stringify(user, null, 2)}
                                </pre>
                            </details>

                            <details className="w-full">
                                <summary className="mt-6 font-bold uppercase text-sm text-gray-600">
                                    Server verify Test
                                </summary>
                                <pre>
                                    <button
                                        onClick={() => verifyToken().then(setVerifyResult)}
                                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                                    >
                                        Verify token on server
                                    </button>
                                </pre>
                                {Boolean(verifyResult) && (
                                    <pre className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2">
                                        {JSON.stringify(verifyResult, null, 2)}
                                    </pre>
                                )}
                            </details>
                        </div>

                        <details className="w-full">
                            <summary className="mt-6 font-bold uppercase text-sm text-gray-600">
                                User Email Info {user?.email?.address}
                            </summary>
                            <pre className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2">
                                {JSON.stringify(
                                    user?.linkedAccounts.filter(item => item.type === "email"),
                                    null,
                                    2
                                )}
                            </pre>
                        </details>

                        <details className="w-full">
                            <summary className="mt-6 font-bold uppercase text-sm text-gray-600">
                                Solana wallet Info
                            </summary>
                            <pre className="max-w-4xl bg-slate-700 text-slate-50 font-mono p-4 text-xs sm:text-sm rounded-md mt-2">
                                {JSON.stringify(solanaWallet, null, 2)}
                            </pre>
                            <p>
                                Tips: 对于使用自己内置的钱包去签名会唤起钱包需要用户点击确认，对于
                                privy 创建的钱包则会由 privy 帮用户做签名。
                            </p>
                            <div className="space-x-4 my-2 space-y-2">
                                <button
                                    onClick={() => createWallet().then(console.log)}
                                    className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none "
                                >
                                    Create a solana wallet
                                </button>
                                {solanaWallet.map((item, index) => (
                                    <button
                                        onClick={async () => {
                                            const res = await item?.signMessage(
                                                new TextEncoder().encode("test")
                                            );
                                            console.log("🚀 ~ DashboardPage ~ res:", res);
                                        }}
                                        className="text-sm bg-violet-600 hover:bg-violet-700 py-2 px-4 rounded-md text-white border-none"
                                    >
                                        Sign Message by Solana wallet {index}
                                    </button>
                                ))}
                            </div>
                        </details>
                    </>
                ) : null}
            </main>
        </>
    );
}
