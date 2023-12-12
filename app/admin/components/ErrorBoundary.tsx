'use client'
import Image from "next/image";
import { Chicken } from "@/lib/StaticImages";
import { useRouter } from "next/navigation";

export const ErrorBoundary = () => {
    const router = useRouter();
    return (
        <>
            <div className="w-full h-96 flex flex-col gap-y-4 items-center justify-center">
                <Image
                    src={Chicken}
                    alt="error chicken"
                    width={150}
                />
                <p className="text-lg font-medium ">
                    Oops.. Nothing here except chicken
                </p>
                <button
                    onClick={() => {
                        router.refresh();
                    }}
                    className="group bg-neutral-900 px-2 py-1 flex items-center justify-center gap-x-1 text-sm text-white rounded-md">
                    Reload
                    <iconify-icon width={20} class="group-focus:animate-spin" icon="mdi:autorenew"></iconify-icon>
                </button>
            </div>
        </>
    );
};