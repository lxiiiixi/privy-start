import React, { useEffect } from "react";
import Navbar from "./navbar";
import type { NavbarItem } from "./navbar";
import { useRouter } from "next/router";
import { useBoomWallet } from "boom-wallet-sdk/src";

type Props = {
    children?: React.ReactNode;
    accountId: string;
    appName: string;
    navbarItems: Array<NavbarItem>;
};

export default function Layout({ children, accountId, appName, navbarItems }: Props) {
    const { ready, authenticated } = useBoomWallet();
    const router = useRouter();

    useEffect(() => {
        if (ready && !authenticated) {
            router.push("/");
        }
    }, [ready, authenticated, router]);

    return (
        <>
            <Navbar accountId={accountId} appName={appName} items={navbarItems} />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
        </>
    );
}
