'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Link from "next/link";
import { DefaultHomeSeries } from "@/lib/StaticDataLib";
import { ImagesNoa } from "@/lib/StaticImages";
import Image from "next/image";

const SeriesBanner = () => {

    return (
        <>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row w-full h-full md:h-[75vh] gap-y-5 gap-x-2">
                <div className="basis-1/2 flex flex-col order-last md:order-first min-h-full gap-y-2">
                    <div className="basis-1/3 flex flex-col gap-y-1 items-start justify-center md:justify-end flex-none indent-10">
                        <h1 className="mx-auto md:mx-0 text-3xl md:text-4xl text-black font-bold tracking-tighter">
                            {DefaultHomeSeries.noa.tittle}
                        </h1>
                        <p className="mx-auto md:mx-0 font-medium md:ml-0.5 text-xl">
                            {DefaultHomeSeries.noa.slug}
                        </p>
                    </div>
                    <p className="basis-auto flex-1 mx-10 mb-1 text-ellipsis overflow-hidden text-sm md:text-base tracking-tighter">
                        { DefaultHomeSeries.noa.description }
                    </p>
                    <Link href="/" className="order-last basis-10 ml-10 w-32 md:w-36 text-center p-3 md:p-0 md:px-2.5 md:py-2 bg-black text-sm md:text-base text-white">
                        SEE GALLERY <i className="bi bi-caret-right"></i>
                    </Link>
                </div>

                <div className="basis-1/2 flex items-center justify-center overflow-hidden">
                    <div className="w-96 md:w-[30rem] lg:w-[34rem] aspect-[4/3]">
                        <Swiper
                            className="relative w-full h-full"
                            loop={true}
                            modules={[EffectFade, Autoplay]}
                            autoplay={{
                                delay: 5000,
                            }}
                            effect="fade"
                        >
                            {
                                ImagesNoa.map((image, index) => ((
                                    <SwiperSlide key={index}>
                                        <Image src={image}
                                               alt=".."
                                               style={{
                                                   width: "100%",
                                                   height: "100%",
                                                   objectFit: "cover",
                                                   objectPosition: "center"
                                               }}
                                               priority
                                               placeholder="blur"
                                        />
                                    </SwiperSlide>
                                )))
                            }
                        </Swiper>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SeriesBanner;
