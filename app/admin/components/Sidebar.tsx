'use client'
import styles from './Sidebar.module.css'
import Image from "next/image";
import { AbibasLogo } from "@/lib/StaticImages";
import Link from "next/link";
import getRouteSegments from "@/lib/getRouteSegments";
import { usePathname } from "next/navigation";
import ADMIN_NAVIGATION from "@/lib/AdminNavigationList";
import useAdminContext from "@/app/admin/context/useAdminContext";
import { useState } from "react";
import { signOut } from "next-auth/react";
export const Sidebar = () => {
    const {
        secondRouteSegment,
    } = getRouteSegments(usePathname());
    const { adminState, adminDispatch, ADMIN_STATE_ACTIONS } = useAdminContext();
    const [ isHovered, setIsHovered ] = useState<boolean>(false)
    return (
        <>
            <nav
                onMouseEnter={() => {
                    setIsHovered(true)
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
                className={`
                    ${ adminState.openSidebar || isHovered
                    ? styles.sidebarActive
                    : styles.sidebarDeactive
                    } 
                    ${ styles.sidebarRoot }
                `}>
                <div className="w-full h-full bg-white relative">
                    <div className={styles.heading}>
                        <Image
                            src={AbibasLogo}
                            alt="abibas-logo"
                            quality={100}
                            className="w-11"
                        />
                        <h1 className="text-3xl font-bold font-sans">
                            ABIBAS
                        </h1>
                    </div>
                    <button
                        onClick={() => {
                            setIsHovered(false);
                            adminDispatch({
                                type: ADMIN_STATE_ACTIONS.TOGGLE_SIDEBAR,
                                payload: false
                            })
                        }}
                        className="absolute -right-5 z-10 lg:hidden flex items-center justify-center top-1/3 rounded-full w-12 h-12 border-white border-2"
                    >
                        <iconify-icon width={60} icon="mdi:chevron-left-circle"></iconify-icon>
                    </button>


                    <div className="w-full space-y-4">
                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.DASHBOARD }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.DASHBOARD
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:home"></iconify-icon>
                            </div>
                            <p >Dashboard</p>
                        </Link>
                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.CATEGORIES }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.CATEGORIES
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:folder-multiple-outline"></iconify-icon>
                            </div>
                            <p >Categories</p>
                        </Link>
                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.SERIES }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.SERIES
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:cards"></iconify-icon>
                            </div>
                            <p >Series</p>
                        </Link>
                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.TAGS }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.TAGS
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={26} icon="mdi:tag-multiple-outline"></iconify-icon>
                            </div>
                            <p >Tags</p>
                        </Link>
                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.PRODUCTS }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.PRODUCTS
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:shopping-outline"></iconify-icon>
                            </div>
                            <p >Products</p>
                        </Link>

                        <Link
                            href={`/admin/${ ADMIN_NAVIGATION.EVENTS }`}
                            className={ secondRouteSegment === ADMIN_NAVIGATION.EVENTS
                                ? styles.buttonActive
                                : styles.buttonInactive
                            }
                        >
                            <div className="mt-1 ml-2 basis-1/5 ">
                                <iconify-icon width={24} icon="mdi:calendar-month-outline"></iconify-icon>
                            </div>
                            <p >Events</p>
                        </Link>
                    </div>

                    <div className="absolute w-10/12 h-12 left-1/2 -translate-x-1/2 bottom-3 flex flex-row items-center text-base text-white font-medium rounded-md bg-neutral-900 select-none">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <iconify-icon width={30} icon="mdi:account-circle"></iconify-icon>
                        </div>
                        <p className="flex-1 overflow-ellipsis truncate">
                            Mas Sando
                        </p>
                        <div className="peer order-last w-10 flex items-center justify-center">
                            <button
                                className="w-full"
                                onClick={() => {
                                    signOut({
                                        redirect: true
                                    })
                                }}>
                                <iconify-icon width={26} icon="mdi:logout-variant"></iconify-icon>
                            </button>
                        </div>
                        <span className="peer-hover:opacity-100 transition-opacity bg-neutral-900 px-2 py-1 text-sm text-zinc-100 rounded-md absolute -right-2.5 -translate-y-[150%] opacity-0">
                                Logout
                        </span>
                    </div>
                </div>
            </nav>
        </>
    );
};