import { useLogin } from "@privy-io/react-auth";

export default function WalletConnectButton({ onComplete }: { onComplete: () => void }) {
    const { login } = useLogin({
        onComplete: () => onComplete(),
    });

    return (
        <button
            className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
            onClick={login}
        >
            Connect Wallet
        </button>
    );
}
