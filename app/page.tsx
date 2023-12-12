'use client'
// import EventBanner  from "./components/EventBanner"
// import GenderBanner from "@/app/components/GenderBanner";
// import Navbar from "@/app/components/Navbar";
// import SeriesBanner from "@/app/components/SeriesBanner";
// import WhatsHot from "@/app/components/WhatsHot";
import Link from "next/link";

const HomePage = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center gap-y-10 min-h-screen bg-gradient-to-tl from-neutral-600 via-neutral-900 to-neutral-900 text-white">
                Currently On build... You can try the Sign up then Sign In to Admin Dashboard, but not finished yet All tho
                <Link
                    href="/sign-up"
                    className="w-44 h-10 rounded-md text-neutral-900 bg-zinc-200 flex items-center gap-x-2 justify-center">
                    {`Let's Try Sign-Up`} <iconify-icon icon="mdi:open-in-new"></iconify-icon>
                </Link>
            </div>


            {/*<main className="mt-24 flex flex-col gap-y-20 w-full h-full bg-white ">*/}
                {/*<Navbar />*/}
                {/*<SeriesBanner />*/}
                {/*<EventBanner />*/}
                {/*<WhatsHot />*/}
                {/*<GenderBanner />*/}
            {/*</main>*/}
        </>
    )
}
export default HomePage
