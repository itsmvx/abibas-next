import Image from "next/image";
import { Noa2L, Rio1L, Rio2L } from "@/lib/StaticImages";
import Link from "next/link";
import ADMIN_NAVIGATION from "@/lib/AdminNavigationList";
import AdminContentWrapper from "@/app/admin/components/AdminContentWrapper";
import prisma from "@/lib/prisma";
import { ErrorBoundary } from "@/app/admin/components/ErrorBoundary";
import { dateFormat } from "@/lib/DateLib";

const getDashboardData = async () => {
    try {
        const [categories, products, series, events] = await Promise.all([
            prisma.categories.aggregate({
                _count: true,
                _max: {
                    created_at: true
                }
            }),
            prisma.products.aggregate({
                _count: true,
                _max: {
                    created_at: true
                }
            }),
            prisma.series.aggregate({
                _count: true,
                _max: {
                    created_at: true
                }
            }),
            prisma.events.aggregate({
                _count: true,
                _max: {
                    created_at: true
                }
            })
        ])

        return {
            categories: {
                count: categories._count,
                createdAt: categories._max.created_at
            },
            products: {
                count: products._count,
                createdAt: products._max.created_at
            },
            series: {
                count: series._count,
                createdAt: series._max.created_at
            },
            events: {
                count: events._count,
                createdAt: events._max.created_at
            },
        }
    } catch (error) {
        return null;
    }
}
const DashboardPage = async () => {
    const dashboardData = await getDashboardData();

    if (!dashboardData) {
        return (
            <>
                <ErrorBoundary />
            </>
        )
    }
    const sampleH1 = "Abibas Night StarFall MK.I";
    const sampleH2 = "Abibas Netherlight ultimate";
    const sampleH3 = "Abibas Constant Async";
    const getSegmentRouteName = (name: string): string => {
        return name.toLowerCase().replace(/[\s.]+/g, '-');
    }
    return (
        <>
            <AdminContentWrapper>
                <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-x-4 lg:gap-x-4 py-2">
                    <div className="w-full h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:folder-multiple-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Categories
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    { `${dashboardData.categories.count} Categories` }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last Entry :
                            { dashboardData.categories.createdAt
                                ? ` ${dateFormat(dashboardData.categories.createdAt.toDateString(), 'YYYY-MM-DD')}`
                                : 'Not set yet'
                            }
                        </div>
                    </div>

                    <div className="w-full h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:cards"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Series
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    { `${dashboardData.series.count} Series` }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last entry :
                            { dashboardData.series.createdAt
                                ? ` ${dateFormat(dashboardData.series.createdAt.toDateString())} `
                                : ' Not set yet'
                            }
                        </div>
                    </div>
                    <div className="w-full h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:shopping-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Products
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    { `${dashboardData.products.count} Products`}
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            Last entry :
                            { dashboardData.products.createdAt
                                ? ` ${dateFormat(dashboardData.products.createdAt.toDateString(), 'YYYY-MM-DD')} `
                                : ' Not set yet'

                            }
                        </div>
                    </div>
                    <div className="w-full h-36 bg-white rounded-lg ring-[0.5px] ring-zinc-400 shadow-sm shadow-gray-300">
                        <div className="w-11/12 h-2/3 relative overflow-hidden">
                            <div className="absolute left-5 top-1/3 w-12 h-12 flex items-center justify-center bg-neutral-800 text-white rounded-xl">
                                <iconify-icon width={24} icon="mdi:calendar-month-outline"></iconify-icon>
                            </div>
                            <div className="absolute top-1/3 left-16 right-2 translate-x-2">
                                <h1 className="text-sm text-zinc-700 font-medium text-right truncate">
                                    Total Events
                                </h1>
                                <p className="text-xl text-right font-bold truncate">
                                    { `${dashboardData.events.count} Events` }
                                </p>
                            </div>
                        </div>
                        <div className="h-10 flex items-end justify-center text-sm text-zinc-700">
                            7 Events on going
                        </div>
                    </div>
                </section>

                <section className="space-y-3 select-none">
                    <div className="flex flex-col md:flex-row justify-between items-center lg:items-start gap-x-5 gap-y-4">
                        <div className="relative group w-11/12 lg:w-80 aspect-[5/4] transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Products
                            </div>
                            <Image
                                src={Rio1L}
                                alt=""
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly  bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {` Abibas Night Star Fall MK I `}
                                </h1>
                                <div className="text-center text-white">
                                    <Link
                                        href={`/admin/${ADMIN_NAVIGATION.PRODUCTS}/${getSegmentRouteName(sampleH1)}`}
                                        className="peer"
                                    >
                                        <iconify-icon
                                            width={45}
                                            icon="mdi:arrow-right-circle"
                                        />
                                    </Link>
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    {` Updated on: 2022-01-01 `}
                                </p>
                            </div>
                        </div>
                        <div className="relative group w-11/12 lg:w-80 aspect-[5/4] transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Series
                            </div>
                            <Image
                                src={Noa2L}
                                alt=""
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly  bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {` Ushio Noa Sayang `}
                                </h1>
                                <div className="text-center text-white">
                                    <Link
                                        href={`/admin/${ADMIN_NAVIGATION.SERIES}/${getSegmentRouteName(sampleH2)}`}
                                        className="peer"
                                    >
                                        <iconify-icon
                                            width={45}
                                            icon="mdi:arrow-right-circle"
                                        />
                                    </Link>
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    {` Updated on: 2022-02-01 `}
                                </p>
                            </div>
                        </div>
                        <div className="relative group w-11/12 lg:w-80 aspect-[5/4] transition-all duration-300 ease-in-out rounded-md ring-[3px] ring-neutral-900 shadow-sm shadow-zinc-500 overflow-hidden">
                            <div className="absolute z-10 -top-1 -left-1.5 px-3 py-1 -skew-x-[22deg] rounded-r-md text-white bg-neutral-900">
                                Latest Events
                            </div>
                            <Image
                                src={Rio2L}
                                alt=""
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}
                            />
                            <div className="absolute z-20 top-0 bottom-0 left-0 w-full flex flex-col items-center justify-evenly  bg-neutral-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                                <h1 className="justify-self-center mx-8 font-semibold text-zinc-100 text-lg text-center truncate capitalize">
                                    {` Kaa Rio `}
                                </h1>
                                <div className="text-center text-white">
                                    <Link
                                        href={`/admin/${ADMIN_NAVIGATION.EVENTS}/${getSegmentRouteName(sampleH3)}`}
                                        className="peer"
                                    >
                                        <iconify-icon
                                            width={45}
                                            icon="mdi:arrow-right-circle"
                                        />
                                    </Link>
                                    <p className="text-sm tracking-tighter -mt-2 peer-hover:opacity-100 opacity-0 transition-opacity duration-150">
                                        Check details
                                    </p>
                                </div>
                                <p className="font-mono text-sm font-semibold text-white">
                                    {` Updated on: 2022-01-01 `}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </AdminContentWrapper>
        </>
    )
}

export default DashboardPage;
