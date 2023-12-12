'use client'
import { ReactEventHandler, useReducer } from "react";
import { aesEncrypt } from "@/lib/CryptoLib";
import crypto from "crypto";
import { useRouter } from "next/navigation";
const SignUpForm = () => {
    type SignUpStateType = {
        fullnameFilled: boolean;
        usernameFilled: boolean;
        passwordFilled: boolean;
        passwordView: boolean;
        onSubmit: boolean;
        onError: boolean;
    }
    type SignUpActionType = {
        FULLNAME_FILL: string
        FULLNAME_UNFILL: string,
        USERNAME_FILL: string
        USERNAME_UNFILL: string,
        PASSWORD_FILL: string,
        PASSWORD_UNFILL: string,
        PASSWORD_TOGGLE_VISIBILITY: string,
        ONSUBMIT_TRUE: string,
        ONSUBMIT_FALSE: string,
        ONERROR: string
    };
    type SignUpReducerType = {
        type: keyof SignUpActionType,
        payload?: any
    };
    const SIGN_UP_ACTIONS: SignUpActionType = {
        FULLNAME_FILL: 'fullname-fill',
        FULLNAME_UNFILL: 'fullname-unfill',
        USERNAME_FILL: 'username-fill',
        USERNAME_UNFILL: 'username-unfill',
        PASSWORD_FILL: 'password-fill',
        PASSWORD_UNFILL: 'password-unfill',
        PASSWORD_TOGGLE_VISIBILITY: 'password-toggle-visibility',
        ONSUBMIT_TRUE: 'onsubmit-true',
        ONSUBMIT_FALSE: 'onsubmit-false',
        ONERROR: 'onerror'
    }
    const signInReducer = (state: SignUpStateType, action: SignUpReducerType) => {
        switch (action.type) {
            case SIGN_UP_ACTIONS.FULLNAME_FILL:
                return {
                    ...state,
                    fullnameFilled: true,
                    onError: false
                }
            case SIGN_UP_ACTIONS.FULLNAME_UNFILL:
                return {
                    ...state,
                    fullnameFilled: false
                }
            case SIGN_UP_ACTIONS.USERNAME_FILL:
                return {
                    ...state,
                    usernameFilled: true,
                    onError: false
                }
            case SIGN_UP_ACTIONS.USERNAME_UNFILL:
                return {
                    ...state,
                    usernameFilled: false
                }
            case SIGN_UP_ACTIONS.PASSWORD_FILL:
                return {
                    ...state,
                    passwordFilled: true,
                    onError: false
                }
            case SIGN_UP_ACTIONS.PASSWORD_UNFILL:
                return {
                    ...state,
                    passwordFilled: false
                }
            case SIGN_UP_ACTIONS.PASSWORD_TOGGLE_VISIBILITY:
                return {
                    ...state,
                    passwordView: !state.passwordView
                }
            case SIGN_UP_ACTIONS.ONSUBMIT_TRUE:
                return {
                    ...state,
                    onSubmit: true,
                }
            case SIGN_UP_ACTIONS.ONSUBMIT_FALSE:
                return {
                    ...state,
                    onSubmit: false
                }
            case SIGN_UP_ACTIONS.ONERROR:
                return {
                    ...state,
                    onError: true,
                    onSubmit: false
                }
            default:
                return state;
        }
    }
    const [signUpState, signUpDispatch] = useReducer(signInReducer, {
        fullnameFilled: true,
        usernameFilled: true,
        passwordFilled: true,
        passwordView: false,
        onSubmit: false,
        onError: false
    });

    const router = useRouter();
    const handleSubmit = async (event: ReactEventHandler | any) => {
        event.preventDefault();
        if (event.target[0].value === '' ){
            signUpDispatch({ type: SIGN_UP_ACTIONS.USERNAME_UNFILL as keyof SignUpActionType });
            return;
        }
        else if (event.target[1].value === '' ) {
            signUpDispatch({ type: SIGN_UP_ACTIONS.PASSWORD_UNFILL as keyof SignUpActionType });
            return;
        }
        signUpDispatch({ type: SIGN_UP_ACTIONS.ONSUBMIT_TRUE as keyof SignUpActionType });
        const iv = crypto.randomBytes(16);
        const encrypted: string =  aesEncrypt('belut-cibaduyut', iv) || ''
        const reqKey = {
            iv: iv.toString('base64'),
            key: encrypted
        }
        const response = await fetch('/api/auth/register',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': JSON.stringify(reqKey)
            },
            body: JSON.stringify({
                fullname: event.target[0].value,
                username: event.target[1].value,
                password: event.target[2].value
            })
        })
        if (response.ok) {
            signUpDispatch({ type: SIGN_UP_ACTIONS.ONSUBMIT_FALSE as keyof SignUpActionType });
            router.push('/sign-in');
        } else if (response.status === 409) {
            signUpDispatch({ type: SIGN_UP_ACTIONS.ONERROR as keyof SignUpActionType });
        }
    };


    return (
        <>
            <main className="w-full h-screen max-h-screen flex items-center justify-center bg-zinc-100">
                <div className="relative w-96 h-full md:h-4/5 flex flex-col items-center justify-center gap-y-4 md:gap-y-7 ring-zinc-400 ring-1 shadow-zinc-400 rounded-md shadow-md bg-white">
                    <h1 className="h-44 text-xl font-semibold flex items-center justify-center">
                        Sign Up your Account
                    </h1>
                    {
                        signUpState.onError
                            ? (
                                <p className="absolute top-24 left-1/2 -translate-x-1/2 text-black font-medium text-xs">
                                    Username Already Taken
                                </p>
                            )
                            : <></>
                    }
                    <form onSubmit={handleSubmit} className="relative md:h-full w-full flex flex-col justify-start items-center gap-y-8">
                        <div className="relative flex flex-col w-72">
                            <label htmlFor="fullname" className="font-bold text-sm">Full name</label>
                            <input
                                id="fullname"
                                autoComplete="on"
                                type="text"
                                name="fullname"
                                className={` w-full border-b-2 outline-none
                                ${!signUpState.fullnameFilled
                                    ? 'border-b-red-600'
                                    : 'border-b-zinc-800'
                                }`}
                                onInput={() => {
                                    signUpDispatch({ type: SIGN_UP_ACTIONS.FULLNAME_FILL as keyof SignUpActionType })
                                }}
                                onBlur={(event) => {
                                    if (event.target.value  === '') {
                                        signUpDispatch({ type: SIGN_UP_ACTIONS.FULLNAME_UNFILL as keyof SignUpActionType })
                                    }
                                }}
                            />
                            <p className={` ${!signUpState.fullnameFilled
                                ? 'block'
                                : 'hidden'
                            } absolute -bottom-5 text-xs text-red-700`}>
                                Full Name field must be filled.
                            </p>
                        </div>
                        <div className="relative flex flex-col w-72">
                            <label htmlFor="username" className="font-bold text-sm">Username</label>
                            <input
                                id="username"
                                autoComplete="on"
                                type="text"
                                name="username"
                                className={` w-full border-b-2 outline-none
                                ${!signUpState.usernameFilled
                                    ? 'border-b-red-600'
                                    : 'border-b-zinc-800'
                                }`}
                                onInput={() => {
                                    signUpDispatch({ type: SIGN_UP_ACTIONS.USERNAME_FILL as keyof SignUpActionType })
                                }}
                                onBlur={(event) => {
                                    if (event.target.value  === '') {
                                        signUpDispatch({ type: SIGN_UP_ACTIONS.USERNAME_UNFILL as keyof SignUpActionType })
                                    }
                                }}
                            />
                            <p className={` ${!signUpState.usernameFilled
                                ? 'block'
                                : 'hidden'
                            } absolute -bottom-5 text-xs text-red-700`}>
                                Username field must be filled.
                            </p>
                        </div>
                        <div className="relative flex flex-col w-72">
                            <label htmlFor="password" className="font-bold text-sm">Password</label>
                            <input
                                id="password"
                                autoComplete="on"
                                required={true}
                                type={`${signUpState.passwordView ? 'text' : 'password'}`}
                                name="password"
                                className={` w-full border-b-2 outline-none
                                ${!signUpState.passwordFilled
                                    ? 'border-b-red-600'
                                    : 'border-b-zinc-800'
                                }`}
                                onInput={() => {
                                    signUpDispatch({ type: SIGN_UP_ACTIONS.PASSWORD_FILL as keyof SignUpActionType })
                                }}
                                onBlur={(event) => {
                                    if (event.target.value  === '') {
                                        signUpDispatch({ type: SIGN_UP_ACTIONS.PASSWORD_UNFILL as keyof SignUpActionType })
                                    }
                                }}
                            />
                            <button type="button"
                                    onClick={() => {
                                        signUpDispatch({ type: SIGN_UP_ACTIONS.PASSWORD_TOGGLE_VISIBILITY as keyof SignUpActionType })
                                    }}
                                    className="absolute top-1/2 -translate-y-1/2 right-2">
                                <iconify-icon
                                    icon={`${signUpState.passwordView
                                        ? 'mdi:eye'
                                        : 'mdi:eye-off'
                                    }`}>
                                </iconify-icon>
                            </button>
                            <p className={` ${!signUpState.passwordFilled
                                ? 'block'
                                : 'hidden'
                            } absolute -bottom-5 text-xs text-red-700`}>
                                Password field must be filled.
                            </p>
                        </div>

                        <p className="w-72 text-xs font-semibold text-black">
                            Note: Username will be used for your Sign In next time
                        </p>
                        <button type="submit" className="w-72 md:-mt-2 p-2 rounded-md text-white bg-black">
                            { signUpState.onSubmit
                                ? (
                                    <div className="w-6 h-6 rounded-full mx-auto border-4 border-white border-r-transparent animate-spin"></div>
                                )
                                : 'Register'
                            }
                        </button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignUpForm;

