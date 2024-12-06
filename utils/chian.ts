export declare const solana: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "https://solscan.io";
        };
    };
    contracts?:
        | {
              [x: string]:
                  | import("viem").ChainContract
                  | {
                        [sourceId: number]: import("viem").ChainContract | undefined;
                    }
                  | undefined;
              ensRegistry?: import("viem").ChainContract | undefined;
              ensUniversalResolver?: import("viem").ChainContract | undefined;
              multicall3?: import("viem").ChainContract | undefined;
          }
        | undefined;
    id: 101;
    name: "Solana";
    nativeCurrency: {
        readonly decimals: 9;
        readonly name: "Solana SOL";
        readonly symbol: "SOL";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://api.mainnet-beta.solana.com"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom: {
        readonly chainType: "solana";
    };
    fees?: import("viem").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?:
        | import("viem").ChainSerializers<undefined, import("viem").TransactionSerializable>
        | undefined;
};
