import React, { useState } from "react";
import Modal from "./Modal";
import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/router";

interface Wallet {
    id: string;
    name: string;
}

const wallets: Wallet[] = [
    { id: "phantom", name: "Phantom" },
    { id: "okx", name: "OKX Wallet" },
    { id: "metamask", name: "MetaMask" },
];

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const router = useRouter();
    const { login } = usePrivy();

    // https://docs.privy.io/guide/expo/authentication/email
    const {
        sendCode: sendCodeEmail,
        loginWithCode: loginWithCodeEmail,
        state: stateEmail,
    } = useLoginWithEmail({
        onComplete: (user, isNewUser, wasAlreadyAuthenticated, loginMethod) => {
            console.log("🔑 ✅ User successfully logged in with email", {
                user,
                isNewUser,
                wasAlreadyAuthenticated,
                loginMethod,
            });
            router.push("/dashboard");
        },
        onError: (error: any) => {
            console.log(error);
        },
    });

    // Email Local State
    const [email, setEmail] = useState("");
    const [codeEmail, setCodeEmail] = useState("");
    const [emailState, setEmailState] = useState(stateEmail.status as string);

    const onSelectWallet = (wallet: Wallet) => {
        console.log("Selected wallet:", wallet);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Login">
            <div className="p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Login with Email</h2>
                <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                            focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            placeholder="请输入邮箱"
                            onChange={e => setEmail(e.currentTarget.value)}
                        />
                        <button
                            onClick={() => sendCodeEmail({ email })}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                            transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={emailState === "sending-code"}
                        >
                            {emailState === "sending-code"
                                ? "Sending..."
                                : "Send Verification Code"}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <input
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 
                            focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
                            placeholder="请输入验证码"
                            onChange={e => setCodeEmail(e.currentTarget.value)}
                        />
                        <button
                            onClick={() => loginWithCodeEmail({ code: codeEmail })}
                            className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white`}
                            // disabled={emailState === "initial"}
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                        Status: {emailState === "initial" ? "Waiting for code" : emailState}
                    </p>
                </div>
            </div>

            <hr />

            <div className="space-y-2 p-6">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Connect Wallet</h2>
                {wallets.map(wallet => (
                    <button
                        key={wallet.id}
                        onClick={() => onSelectWallet(wallet)}
                        className="w-full flex items-center p-2 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 
                            transition-colors duration-200 group"
                    >
                        <span className="ml-4 text-white text-base font-medium">{wallet.name}</span>
                    </button>
                ))}
            </div>
        </Modal>
    );
}
