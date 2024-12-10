import "./App.css";
import { WalletConnectButton, useBoomWallet } from "boom-wallet-sdk";

function App() {
    const { user, ready, logout, authenticated } = useBoomWallet();

    if (!ready) return <div>Loading...</div>;

    if (!user || !authenticated) return <WalletConnectButton onComplete={() => {}} />;

    return (
        <>
            <div>
                <p>Hello, {user.wallet?.address}</p>
                <button onClick={() => logout()}>Logout</button>
            </div>
        </>
    );
}

export default App;
