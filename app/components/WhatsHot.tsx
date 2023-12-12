'use client'
import 'swiper/react';
import 'swiper/css';
import styles from './WhatsHot.module.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { useEffect, useState } from "react";
import { ImagesAll, LoadingSpinner } from "@/lib/StaticImages"
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

const WhatsHot = () => {
    type SwiperState = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        swiperInstance: SwiperCore,
        slideHover: number,
        slideCount: number
    };
    const calcSlideCount = (): number => {
        if (typeof window !== 'undefined') {
            return window?.innerWidth >= 1024
                ? 3
                : 2
        }
        return 3;
    };
    const [swiperState, setSwiperState] = useState<SwiperState>({
        swiperInstance: null,
        slideHover: -1,
        slideCount: calcSlideCount()
    });

    const [windowLoad, setWindowLoad] = useState<boolean>(false)
    const handleSliderMouseIn = (slideIndex: number) => {
        setSwiperState((prevState) => ({
            ...prevState,
            slideHover: slideIndex
        }))
    };
    const handleSliderMouseOut = () => {
        setSwiperState((prevState) => ({
            ...prevState,
            slideHover: -1
        }))
    };

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                setSwiperState((prevState) => ({
                    ...prevState,
                    slideCount: window?.innerWidth >= 1024 ? 3 : 2,
                }));
            }
        };
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
            setWindowLoad(true);
        };
    }, []);


    return (
        <>
            <div className="flex flex-col w-full ">
                <div className="basis-1/6 py-2 flex-none relative flex justify-end gap-x-1.5 w-full h-full ">
                    <h1 className="absolute left-1/2 -translate-x-1/2 lg:translate-x-0  lg:left-[8%] text-4xl font-bold tracking-tight">
                        {`What's Hot`}
                    </h1>
                    <button
                        onClick={() => {
                            swiperState?.swiperInstance?.slidePrev();
                        }}
                        className="w-12 h-12">
                        <iconify-icon width="100%" icon="mdi:chevron-left-circle"></iconify-icon>
                    </button>
                    <button
                        onClick={() => {
                            swiperState?.swiperInstance?.slideNext();
                        }}
                        className="w-12 h-12 rounded-full mr-[8%]">
                        <iconify-icon width="100%" icon="mdi:chevron-right-circle"></iconify-icon>
                    </button>
                </div>
                {
                    windowLoad
                        ? (
                            <div className="basis-5/6 flex-none overflow-hidden">
                                <Swiper
                                    className="w-11/12 md:w-10/12 h-full mx-auto overflow-hidden select-none"
                                    freeMode={true}
                                    slidesPerView={swiperState?.slideCount ? swiperState.slideCount : 3}
                                    spaceBetween={22}
                                    modules={[FreeMode]}
                                    onSwiper={(swiper): void => {
                                        setSwiperState((prevState: SwiperState) => ({
                                            ...prevState,
                                            swiperInstance: swiper
                                        }))
                                    }}
                                >
                                    {
                                        ImagesAll.map((image: StaticImageData, index: number) => ((
                                            <SwiperSlide key={index}
                                                         onMouseEnter={() => handleSliderMouseIn(index)}
                                                         onMouseLeave={handleSliderMouseOut}
                                                         className="aspect-square relative">
                                                <div
                                                    className={`${swiperState.slideHover === index ? 'opacity-100' : 'opacity-0'} ${styles.whatsHotDesc}`}>
                                                    <div className="basis-3/4 flex-none flex flex-col items-center gap-y-5">
                                                        <h1 className="mt-5 font-bold text-lg">Heading</h1>
                                                        <p className="mx-5 font-semibold">Lorem ipsum scripta odio
                                                            efficiantur potenti vel in mauris</p>
                                                    </div>
                                                    <div
                                                        className="basis-1/4 flex flex-col gap-y-2 items-center justify-center">
                                                        <Link href="/"
                                                              className="font-bold text-sm bg-black p-1.5 text-white">See
                                                            details</Link>
                                                        <p className="font-medium">Rp.69696969</p>
                                                    </div>
                                                </div>
                                                <Image src={image} alt=""
                                                       style={{
                                                           width: "100%",
                                                           height: "100%",
                                                           objectFit: "cover",
                                                           objectPosition: "center"
                                                       }}
                                                       loading="lazy"
                                                       placeholder="blur"
                                                />
                                            </SwiperSlide>
                                        )))
                                    }
                                </Swiper>
                            </div>
                        ) : (
                            <div className="basis-5/6 flex-none overflow-hidden">
                                <div className="w-11/12 md:w-10/12 h-full mx-auto overflow-hidden select-none grid grid-cols-3 gap-4">
                                    {
                                        Array.from({ length: 3 }, (_, index) => ((
                                            <div key={index} className="aspect-square bg-zinc-200 flex items-center justify-center">
                                                <Image src={LoadingSpinner} alt=""
                                                       width={40}
                                                       loading="eager"
                                                />
                                            </div>
                                        )))
                                    }
                                </div>
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default WhatsHot;
