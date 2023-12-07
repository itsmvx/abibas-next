import { Metadata } from "next";
import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import Image from "next/image";
import { AbibasLogo } from "@/lib/StaticImages";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: 'Abibas | Sign In'
}
const SignInPage = async () => {

    const session = await getSession();
    if (session) {
        return redirect('/admin/dashboard')
    }

    return (
        <>
            <main className="w-full min-h-screen flex flex-col gap-y-4 items-center justify-center bg-zinc-100">
                <div className="w-auto h-auto flex items-center justify-center">
                    <Image
                        src={AbibasLogo}
                        alt=""
                        priority
                        style={{
                            width: '35%'
                        }}
                    />
                </div>
                <h1 className="text-center text-2xl font-bold">Sign in to continue</h1>
                <SignInForm />
            </main>
        </>
    )
}

const getSession = async () => {
    return await getServerSession(options);
}

export default SignInPage;