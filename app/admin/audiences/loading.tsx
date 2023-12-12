'use client'
import Image from "next/image";
import { LoadingSpinner } from "@/lib/StaticImages";

const AudiencesLoading = () => {
    return (
        <>
            <div className="h-96 flex items-center justify-center">
                <Image src={LoadingSpinner} alt="loading" width={100} />
            </div>
        </>
    )
}
export default AudiencesLoading;
