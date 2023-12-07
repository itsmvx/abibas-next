import Image from "next/image";
import { Chicken } from "@/lib/StaticImages";

export const ErrorBoundary = () => {
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
            </div>
        </>
    );
};