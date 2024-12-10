import { useLogin, useLoginWithEmail } from "@privy-io/react-auth";
import { PrivyClient } from "@privy-io/server-auth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import LoginModal from "../components/LoginModal";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const cookieAuthToken = req.cookies["privy-token"];
    console.log(
        "🚀 ~ constgetServerSideProps:GetServerSideProps= ~ cookieAuthToken:",
        cookieAuthToken
    );

    // If no cookie is found, skip any further checks
    if (!cookieAuthToken) return { props: {} };

    const PRIVY_APP_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID;
    const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
    const client = new PrivyClient(PRIVY_APP_ID!, PRIVY_APP_SECRET!);

    try {
        const claims = await client.verifyAuthToken(cookieAuthToken);
        // Use this result to pass props to a page for server rendering or to drive redirects!
        // ref https://nextjs.org/docs/pages/api-reference/functions/get-server-side-props
        console.log({ claims });
        console.log("issuedAt", new Date(claims.issuedAt * 1000).toLocaleString());
        console.log("expiresAt", new Date(claims.expiration * 1000).toLocaleString());

        return {
            props: {},
            redirect: { destination: "/dashboard", permanent: false },
        };
    } catch (error) {
        return { props: {} };
    }
};

export default function LoginPage() {
    const router = useRouter();
    const { login } = useLogin({
        onComplete: () => router.push("/dashboard"),
    });

    const { state, sendCode, loginWithCode } = useLoginWithEmail();

    console.log(state);

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Head>
                <title>Login · Privy</title>
            </Head>

            <main className="flex min-h-screen min-w-full">
                <div className="flex bg-privy-light-blue flex-1 p-6 justify-center items-center">
                    <div>
                        <div className="mt-6 flex justify-center text-center gap-4">
                            <button
                                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                                onClick={login}
                            >
                                Log in
                            </button>

                            <button
                                className="bg-violet-600 hover:bg-violet-700 py-3 px-6 text-white rounded-lg"
                                onClick={() => setIsOpen(true)}
                            >
                                Login with custom modal
                            </button>

                            <LoginModal isOpen={isOpen} onClose={handleClose} />

                            {/* <button onClick={() => sendCode({ email: "slowlyxixi@outlook.com" })}>
                                Send code
                            </button>

                            <button onClick={() => loginWithCode({ code: "491814" })}>
                                Login with code
                            </button> */}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
