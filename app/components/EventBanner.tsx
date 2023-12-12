import Image from "next/image";
import Link from "next/link";
import {HaloFest1L} from "@/lib/StaticImages";

const EventBanner = () => {
    return (
        <>
            <div className="flex items-center justify-center w-full h-auto bg-white">
                <div className="relative aspect-[1.85/1] w-full h-full overflow-hidden text-white font-sans">
                    <Image src={HaloFest1L}
                           alt="..."
                           style={{
                               width: "100%",
                               height: "100%",
                               objectFit: "cover",
                               objectPosition: "center"
                           }}
                           className="brightness-[60%]"
                           loading="lazy"
                           placeholder="blur"
                    />
                    <div className="absolute top-[60%] left-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold italic">RUN YOUR RUN</h1>
                        <p className="sm:text-lg md:text-xl lg:text-2xl font-semibold tracking-tighter">
                            Get exclusive Kivotos Halo Festival Series for your amazing steps
                        </p>
                    </div>
                    <Link href="/" className="absolute top-[82%] md:top-[80%] left-10 text-sm lg:text-xl font-medium text-black bg-white px-1.5 py-1.5 md:px-3 md:py-2.5 lg:px-4 lg:py-3.5 ring-[1px] ring-inset ring-black ">
                        SHOP NOW
                        <i className="bi bi-arrow-right font-bold">

                        </i>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default EventBanner;
