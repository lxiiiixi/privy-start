import { usePrivy } from "@privy-io/react-auth";

export const useBoomWallet = () => {
    const { user, ready, authenticated, login, logout } = usePrivy();

    return {
        user,
        ready,
        authenticated,
        login,
        logout,
    };
};
