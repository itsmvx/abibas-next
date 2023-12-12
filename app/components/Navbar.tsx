'use client'
import { useEffect, useReducer, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import Link from "next/link";
import { AbibasLogo } from "@/lib/StaticImages";

const Navbar = () => {
    type NavbarActionsType = {
        SCROLL_UP: string,
        SCROLL_DOWN: string,
        MENU_MOUSE_IN: string,
        MENU_MOUSE_OUT: string
    };
    type NavbarStateType = {
        activeMenu: string | undefined,
        isScrollDown: boolean
    };
    type NavbarReducerActionType = {
        type: keyof NavbarActionsType,
        payload?: any
    };
    const NAVBAR_ACTIONS: NavbarActionsType = {
        SCROLL_UP: 'scroll-up',
        SCROLL_DOWN: 'scroll-down',
        MENU_MOUSE_IN: 'menu-mouse-in',
        MENU_MOUSE_OUT: 'menu-mouse-out'
    };
    const navbarReducer = (state: NavbarStateType, action: NavbarReducerActionType) => {
        switch (action.type) {
            case NAVBAR_ACTIONS.SCROLL_UP:
                return {
                    ...state,
                    isScrollDown: false
                };
            case NAVBAR_ACTIONS.SCROLL_DOWN:
                return {
                    ...state,
                    isScrollDown: true
                };
            case NAVBAR_ACTIONS.MENU_MOUSE_IN:
                return {
                    ...state,
                    activeMenu: action?.payload
                };
            case NAVBAR_ACTIONS.MENU_MOUSE_OUT:
                return {
                    ...state,
                    activeMenu: ''
                };
            default:
                return state;
        }
    }
    const [navbarState, navbarDispatch] = useReducer(navbarReducer, {
        activeMenu: '',
        isScrollDown: false
    });
    const navbarAnimation = useSpring({
        transform: navbarState.isScrollDown
            ? 'translateY(-100%)'
            : 'translateY(0%)',
        config: {
            duration: 225
        }
    });
    const navbarMenuRef= useRef<HTMLDivElement | null>(null);
    const [navbarMenuAnimation, navbarMenuAnimationApi] = useSpring(() => ({
        opacity: 0,
    }));
    const navMenuAnimationShow = () => {
        return navbarMenuAnimationApi.start({
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            config: {
                duration: 160
            },
            delay: 100,
            onStart:() => {
                navbarMenuRef?.current?.classList.remove('hidden')
            },
        })
    }
    const navMenuAnimationHidden = () => {
        return navbarMenuAnimationApi.start({
            from: {
                opacity: 1
            },
            to: {
                opacity: 0
            },
            config: {
                duration: 60
            },
            delay: 100,
            onRest:() => {
                navbarMenuRef?.current?.classList.add('hidden')
            },
        })
    }
    type SearchActionsType = {
        TYPING_SEARCH: string,
        START_SEARCH: string,
        CANCEL_SEARCH: string,
        ERROR_SEARCH: string,
        RESULT_SEARCH: string
    };
    type SearchStateType = {
        isSearching: boolean,
        searchValue: string | undefined,
        searchData: []
    };
    type SearchReducerType = {
        type: keyof SearchActionsType,
        payload?: any
    };
    const SEARCH_ACTIONS: SearchActionsType = {
        TYPING_SEARCH: 'typing-search',
        START_SEARCH: 'start-search',
        CANCEL_SEARCH: 'cancel-search',
        ERROR_SEARCH: 'error-search',
        RESULT_SEARCH: 'result-search'
    };
    const searchReducer = (state: SearchStateType, action: SearchReducerType) => {
        switch (action.type) {
            case SEARCH_ACTIONS.TYPING_SEARCH:
                return {
                    ...state,
                    searchValue: action.payload
                };
            case SEARCH_ACTIONS.START_SEARCH:
                return {
                    ...state,
                    isSearching: true
                };
            case SEARCH_ACTIONS.CANCEL_SEARCH:
                return {
                    ...state,
                    isSearching: false,
                    searchData: [],
                    searchValue: ''
                };
            case SEARCH_ACTIONS.RESULT_SEARCH:
                return {
                    ...state,
                    isSearching: false,
                    searchData: action.payload
                };
            default:
                return state;
        }
    };
    const [searchState, searchDispatch] = useReducer(searchReducer, {
        isSearching: false,
        searchValue: '',
        searchData: [],
    });

    useEffect(() => {
        let lastScrollY: number;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 40) {
                if (currentScrollY > lastScrollY) {
                    navbarDispatch({ type: NAVBAR_ACTIONS.SCROLL_DOWN as keyof NavbarActionsType });
                    navbarDispatch({ type: NAVBAR_ACTIONS.MENU_MOUSE_OUT as keyof NavbarActionsType });
                    navbarMenuAnimationApi.start({
                        from: {
                            opacity: 1
                        },
                        to: {
                            opacity: 0
                        },
                        config: {
                            duration: 0
                        },
                        onRest: () => {
                            navbarMenuRef.current?.classList.add('hidden');
                        }
                    })
                } else {
                    navbarDispatch({ type: NAVBAR_ACTIONS.SCROLL_UP as keyof NavbarActionsType });
                }
            }
            lastScrollY = currentScrollY;
        };
        if (typeof window !== 'undefined') {
            lastScrollY = window?.scrollY;
            window?.addEventListener('scroll', handleScroll)
        }
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll)
            }
        };
    }, []);


    let searchTypingTimeout: ReturnType<typeof setTimeout>;

    return (
        <>
            <animated.nav style={navbarAnimation}
                          className="w-full h-24 bg-white flex flex-col fixed top-0 left-0 z-50 border-b-2"
                          onMouseEnter={() => {
                              navbarDispatch({
                                  type: NAVBAR_ACTIONS.MENU_MOUSE_IN as keyof NavbarActionsType,
                                  payload: navbarState.activeMenu
                              })
                              navMenuAnimationShow();
                          }}
                          onMouseLeave={() => {
                              navbarDispatch({
                                  type: NAVBAR_ACTIONS.MENU_MOUSE_OUT as keyof NavbarActionsType
                              })
                              navMenuAnimationHidden();
                          }}
            >
                <div className="w-full flex-1 h-full flex flex-row" >
                    <button className="basis-2/12 sm:basis-[12%] md:hidden w-full flex-none text-2xl mx-auto ">
                        <i className="bi bi-list"></i>
                    </button>
                    <div
                        className="flex-1 md:flex-none basis-8/12 sm:basis-[76%] md:basis-1/4 md:order-first flex flex-row items-center justify-center">
                        <Image
                            width={400}
                            quality={100}
                            src={AbibasLogo}
                            className="w-12 sm:w-14"
                            alt="..."
                        />
                        <Link href="/" className="mt-2 font-breston font-bold text-3xl">
                            ABIBAS
                        </Link>
                    </div>
                    <div className="hidden basis-3/4 md:flex md:flex-col mb-2">
                        <ul className="basis-1/4 flex flex-row justify-end gap-x-5 text-sm text-slate-600 font-sans mt-0.5 mr-3">
                            <Link href="/">News</Link>
                            <Link href="/">Help</Link>
                            <Link href="/">FAQ</Link>
                            <Link href="/">About us</Link>
                        </ul>
                        <div className="basis-3/4 flex flex-row">
                            <div
                                className="flex-1 basis-auto mt-2 flex flex-row justify-center items-center gap-x-8 text-lg font-breston font-semibold ">
                                <Link href="/"
                                      className="px-3 hover:underline underline-offset-4 decoration-4 decoration-slate-950"
                                      onMouseEnter={() => navbarDispatch({
                                          type: NAVBAR_ACTIONS.MENU_MOUSE_IN as keyof NavbarActionsType,
                                          payload: 'nav-menu-men'
                                      })}
                                >
                                    MEN
                                </Link>
                                <Link href="/"
                                      className="px-3 hover:underline underline-offset-4 decoration-4 decoration-slate-950"
                                      onMouseEnter={() => navbarDispatch({
                                          type: NAVBAR_ACTIONS.MENU_MOUSE_IN as keyof NavbarActionsType,
                                          payload: 'nav-menu-women'
                                      })}
                                >
                                    WOMEN
                                </Link>
                                <Link href="/"
                                      className="px-3 hover:underline underline-offset-4 decoration-4 decoration-slate-950"
                                      onMouseEnter={() => navbarDispatch({
                                          type: NAVBAR_ACTIONS.MENU_MOUSE_IN as keyof NavbarActionsType,
                                          payload: 'nav-menu-kid'
                                      })}
                                >
                                    KID
                                </Link>
                            </div>
                            <div className="md:basis-[30%] flex items-center">
                                <form
                                    className="my-auto relative w-full h-3/4 border-[1.5px] border-black rounded-md overflow-hidden antialiased "
                                    action="/s">
                                    <input
                                        type="text"
                                        value={searchState.searchValue}
                                        className="w-full h-full bg-zinc-100 focus:outline-0 text-sm font-medium indent-2 text-ellipsis"
                                        placeholder="ABIBAS Ori Cibaduyut"
                                        onChange={(e) => {
                                            searchTypingTimeout = setTimeout(() => {
                                                searchDispatch({
                                                    type: SEARCH_ACTIONS.TYPING_SEARCH as keyof SearchActionsType,
                                                    payload: e.target.value
                                                });
                                            }, 1800);
                                            clearTimeout(searchTypingTimeout);

                                            e.target.value === '' && searchDispatch({
                                                type: SEARCH_ACTIONS.CANCEL_SEARCH as keyof SearchActionsType
                                            });
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className={`${searchState.searchValue === '' ? 'invisible' : 'visible'} absolute right-1 top-1/2 -translate-y-1/2`}
                                        onClick={() => {
                                            searchDispatch({type: SEARCH_ACTIONS.CANCEL_SEARCH as keyof SearchActionsType});
                                        }}
                                    >
                                        <iconify-icon icon="mdi:close-circle-outline"></iconify-icon>
                                    </button>
                                </form>
                            </div>
                            <div className="basis-[5%] flex items-center justify-center text-2xl">
                                <iconify-icon icon="mdi:magnify"></iconify-icon>
                            </div>
                        </div>
                    </div>
                    <button className="basis-2/12 sm:basis-[12%] md:hidden w-full flex-none text-2xl mx-auto">
                        <i className="bi bi-search"></i>
                    </button>
                </div>

                <div className="w-full relative">
                    <animated.div style={navbarMenuAnimation}
                                  ref={navbarMenuRef}
                                  className={`absolute hidden -mt-1 z-10 left-0 w-full flex flex-row bg-white border-y-[1.5px] border-zinc-400`}
                    >
                        <div className="basis-1/4 w-full h-full">
                            <h1 className="w-full mt-7 mb-5 mx-4 font-bold font-sans text-lg">FEATURED</h1>
                            <ul className="w-full h-full flex flex-col items-start mb-4 mx-4 gap-y-0.5 tracking-tighter">
                                <Link href="/">New Arrival</Link>
                                <Link href="/">{`What's Hot`}</Link>
                                <Link href="/">Series</Link>
                                <Link href="/">Events</Link>
                            </ul>
                        </div>

                        <div className="basis-1/4 w-full h-full">
                            <h1 className="w-full mt-7 mb-5 mx-4 font-bold font-sans text-lg">SHOES</h1>
                            <ul className="w-full h-full flex flex-col items-start mb-4 mx-4 gap-y-0.5 tracking-tighter">

                            </ul>
                        </div>
                    </animated.div>
                </div>
            </animated.nav>
        </>
    )
}

export default Navbar;