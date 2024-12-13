import { Buffer } from "buffer";

if (typeof window !== "undefined") {
    window.Buffer = Buffer; // buffer Polyfill
}

export { default as BoomWalletProvider } from "./BoomWalletProvider";
export { useBoomWallet } from "./useBoomWallet";
export { default as WalletConnectButton } from "./WalletConnectButton";
