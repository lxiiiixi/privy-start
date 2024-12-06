import type { NextApiRequest, NextApiResponse } from "next";

import { PrivyClient, SolanaSignMessageRpcInputType } from "@privy-io/server-auth";

const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!, {
    walletApi: {
        authorizationPrivateKey: "insert-your-authorization-private-key-from-the-dashboard",
    },
});

export type AuthenticationErrorResponse = {
    error: string;
};

export type SignatureResponse = {
    signature: Uint8Array;
};

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SignatureResponse | AuthenticationErrorResponse>
) {
    const headerAuthToken = req.headers.authorization?.replace(/^Bearer /, "");
    const cookieAuthToken = req.cookies["privy-token"];

    const authToken = cookieAuthToken || headerAuthToken;
    if (!authToken) return res.status(401).json({ error: "Missing auth token" });

    const request: SolanaSignMessageRpcInputType = {
        address: "4tFqt2qzaNsnZqcpjPiyqYw9LdRzxaZdX2ewPncYEWLA", // Address of the wallet to take actions with.
        chainType: "solana",
        method: "signMessage",
        params: {
            message: "Hello, world!",
        },
    };

    try {
        const { data } = await client.walletApi.rpc(request);
        const signature: Uint8Array = data.signature;
        return res.status(200).json({ signature });
    } catch (e: any) {
        return res.status(401).json({ error: e.message });
    }
}

export default handler;
