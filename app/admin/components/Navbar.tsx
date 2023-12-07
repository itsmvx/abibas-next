'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import getRouteSegments from "@/lib/getRouteSegments"
import useAdminContext from "@/app/admin/context/useAdminContext";
import { useRef } from "react";
export const Navbar = () => {
    const {
        firstRouteSegment,
        secondRouteSegment,
        thirdRouteSegment
    } = getRouteSegments(usePathname());

    const { adminDispatch, ADMIN_STATE_ACTIONS } = useAdminContext();
    const navbarRef = useRef<HTMLUnknownElement>(null);

    return (
        <>
            <nav
                ref={navbarRef}
                className="h-20 ml-1 flex flex-row justify-between gap-x-4 select-none">
                <button
                    onFocus={() => {
                        adminDispatch({
                            type: ADMIN_STATE_ACTIONS.TOGGLE_SIDEBAR
                        })
                    }}
                    onBlur={() => {
                        adminDispatch({
                            type: ADMIN_STATE_ACTIONS.TOGGLE_SIDEBAR
                        })
                    }}
                    className="ml-3.5 w-11 h-11 flex items-center justify-center lg:hidden hover:bg-zinc-300 rounded-md">
                    <iconify-icon width={36} icon="ph:list-bold"></iconify-icon>
                </button>

                <div className="w-80 space-y-1 text-sm">
                    <div className="flex flex-row gap-x-1 text-xs">
                        <h1 className="text-zinc-700 cursor-auto capitalize">
                            { firstRouteSegment }
                        </h1>
                        <span> / </span>
                        <Link
                            href={`/admin/${ secondRouteSegment }`}
                            className="text-black cursor-pointer capitalize font-medium hover:underline hover:underline-offset-4 hover:decoration-2">
                            { secondRouteSegment }
                        </Link>
                        {
                            thirdRouteSegment !== null && (
                                <>
                                    <span> / </span>
                                    <Link
                                        href={`/admin/${ thirdRouteSegment }`}
                                        className="text-black cursor-pointer capitalize font-medium hover:underline hover:underline-offset-4 hover:decoration-2 truncate">
                                        { thirdRouteSegment }
                                    </Link>
                                </>
                            )
                        }
                    </div>
                    <p className="font-bold text-base capitalize">
                        { thirdRouteSegment ?? secondRouteSegment }
                    </p>
                </div>
                <div className="flex-1 flex flex-row-reverse items-start text-zinc-600">
                    <button className="w-10 h-10 flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="mdi:cog"></iconify-icon>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="mdi:bell"></iconify-icon>
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center hover:text-black hover:bg-zinc-300 rounded-md mr-2">
                        <iconify-icon width={20} icon="mdi:cog"></iconify-icon>
                    </button>
                    <form className="rounded-md relative mr-2 hidden lg:block">
                        <input
                            id="admin-nav-search"
                            type="text"
                            className="peer border-2 border-gray-500 transition-colors duration-200 ease-in-out focus:border-black bg-transparent indent-1.5 py-1.5 outline-none rounded-md"
                        />
                        <label className="absolute left-3 text-sm block z-0 bg-zinc-100 tracking-wide top-2 peer-focus:top-1.5 peer-focus:-translate-y-4 peer-focus:-translate-x-1.5 peer-focus:font-semibold peer-focus:text-black cursor-text transition-all duration-200 ease-in-out" htmlFor="admin-nav-search">
                            Search
                        </label>
                    </form>
                </div>
            </nav>
        </>
    );
};