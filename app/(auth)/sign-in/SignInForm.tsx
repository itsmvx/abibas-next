'use client'
import { FormEvent, useReducer } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInForm = () => {
    const router = useRouter();

    type SignInStateType = {
        usernameFilled: boolean;
        passwordFilled: boolean;
        passwordView: boolean;
        onSubmit: boolean;
        onUnauthorized: boolean;
    }
    type SignInActionType = {
        USERNAME_FILL: string
        USERNAME_UNFILL: string,
        PASSWORD_FILL: string,
        PASSWORD_UNFILL: string,
        PASSWORD_TOGGLE_VISIBILITY: string,
        ONSUBMIT_TRUE: string,
        ONSUBMIT_FALSE: string,
        ONUNAUTHORIZED: string
    };
    type SignInReducerType = {
        type: keyof SignInActionType,
        payload?: any
    };
    const SIGN_IN_ACTIONS: SignInActionType = {
        USERNAME_FILL: 'username-fill',
        USERNAME_UNFILL: 'username-unfill',
        PASSWORD_FILL: 'password-fill',
        PASSWORD_UNFILL: 'password-unfill',
        PASSWORD_TOGGLE_VISIBILITY: 'password-toggle-visibility',
        ONSUBMIT_TRUE: 'onsubmit-true',
        ONSUBMIT_FALSE: 'onsubmit-false',
        ONUNAUTHORIZED: 'onuauthorized'
    }
    const signInReducer = (state: SignInStateType, action: SignInReducerType) => {
        switch (action.type) {
            case SIGN_IN_ACTIONS.USERNAME_FILL:
                return {
                    ...state,
                    usernameFilled: true,
                    onUnauthorized: false
                }
            case SIGN_IN_ACTIONS.USERNAME_UNFILL:
                return {
                    ...state,
                    usernameFilled: false
                }
            case SIGN_IN_ACTIONS.PASSWORD_FILL:
                return {
                    ...state,
                    passwordFilled: true,
                    onUnauthorized: false
                }
            case SIGN_IN_ACTIONS.PASSWORD_UNFILL:
                return {
                    ...state,
                    passwordFilled: false
                }
            case SIGN_IN_ACTIONS.PASSWORD_TOGGLE_VISIBILITY:
                return {
                    ...state,
                    passwordView: !state.passwordView
                }
            case SIGN_IN_ACTIONS.ONSUBMIT_TRUE:
                return {
                    ...state,
                    onSubmit: true,
                }
            case SIGN_IN_ACTIONS.ONSUBMIT_FALSE:
                return {
                    ...state,
                    onSubmit: false
                }
            case SIGN_IN_ACTIONS.ONUNAUTHORIZED:
                return {
                    ...state,
                    onUnauthorized: true,
                    onSubmit: false
                }
            default:
                return state;
        }
    }
    const [signInState, signInDispatch] = useReducer(signInReducer, {
        usernameFilled: true,
        passwordFilled: true,
        passwordView: false,
        onSubmit: false,
        onUnauthorized: false
    });
    const handleFormSubmit = async (event: FormEvent | any) => {
        event.preventDefault();
        if (event.target[0].value === '' ){
            signInDispatch({ type: SIGN_IN_ACTIONS.USERNAME_UNFILL as keyof SignInActionType });
            return;
        }
        else if (event.target[1].value === '' ) {
            signInDispatch({ type: SIGN_IN_ACTIONS.PASSWORD_UNFILL as keyof SignInActionType });
            return;
        }
        signInDispatch({ type: SIGN_IN_ACTIONS.ONSUBMIT_TRUE as keyof SignInActionType });
        const authResult = await signIn('credentials', {
            username: event.target[0].value,
            password: event.target[1].value,
            redirect: false,
        });
        if (authResult?.status === 401){
            signInDispatch({ type: SIGN_IN_ACTIONS.ONUNAUTHORIZED as keyof SignInActionType });
        }
        else {
            router.refresh();
            router.push('/admin/dashboard')
            signInDispatch({ type: SIGN_IN_ACTIONS.ONSUBMIT_FALSE as keyof SignInActionType });
        }
    };

    return (
        <>
            <div className="relative w-80 md:w-96 h-80 md:h-96 rounded-lg bg-white shadow-md shadow-zinc-400">
                <form onSubmit={handleFormSubmit} className="relative w-full h-full flex flex-col justify-center items-center gap-y-8">
                    <p className={`${signInState.onUnauthorized
                        ? 'block'
                        : 'hidden'
                    } absolute top-5 md:top-10 text-sm text-red-700`}>
                        Username or Password is Wrong!
                    </p>
                    <div className="relative flex flex-col w-72">
                        <label htmlFor="username" className="font-bold text-sm">Username</label>
                        <input
                            id="username"
                            autoComplete="on"
                            type="text"
                            name="username"
                            onInput={() => {
                                signInDispatch({ type: SIGN_IN_ACTIONS.USERNAME_FILL as keyof SignInActionType })
                            }}
                            onBlur={(event) => {
                                if (event.target.value  === '') {
                                    signInDispatch({ type: SIGN_IN_ACTIONS.USERNAME_UNFILL as keyof SignInActionType })
                                }
                            }}
                            className={` w-full border-b-2 outline-none
                                ${!signInState.usernameFilled
                                ? 'border-b-red-600'
                                : 'border-b-zinc-800'
                            }`}
                        />
                        <p className={` ${!signInState.usernameFilled
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
                            type={ signInState.passwordView ? 'text' : 'password' }
                            name="password"
                            onInput={() => {
                                signInDispatch({ type: SIGN_IN_ACTIONS.PASSWORD_FILL as keyof SignInActionType })
                            }}
                            onBlur={(event) => {
                                if (event.target.value  === '') {
                                    signInDispatch({ type: SIGN_IN_ACTIONS.PASSWORD_UNFILL as keyof SignInActionType })
                                }
                            }}
                            className={` w-full border-b-2 outline-none
                                ${!signInState.passwordFilled
                                ? 'border-b-red-600'
                                : 'border-b-zinc-800'
                            }`}
                        />
                        <button type="button" onClick={() => {
                            signInDispatch({ type: SIGN_IN_ACTIONS.PASSWORD_TOGGLE_VISIBILITY as keyof SignInActionType })
                        }}
                                className="absolute top-1/2 -translate-y-1/2 right-2">
                            <iconify-icon
                                icon={`${signInState.passwordView
                                    ? 'mdi:eye'
                                    : 'mdi:eye-off'
                                }`}>
                            </iconify-icon>
                        </button>
                        <p className={` ${!signInState.passwordFilled
                            ? 'block'
                            : 'hidden'
                        } absolute -bottom-5 text-xs text-red-700`}>
                            Password field must be filled.
                        </p>
                    </div>

                    <button type="submit" className="w-72 p-2 rounded-md text-white bg-black">
                        {signInState.onSubmit ? (
                            <div className="w-6 h-6 rounded-full mx-auto border-4 border-white border-r-transparent animate-spin">

                            </div>) : 'Login'}
                    </button>
                </form>
                <div className="absolute bottom-5 left-11 text-sm tracking-tighter font-medium">
                    Not an Admin?
                    <Link href="/" className="ml-1 underline underline-offset-4">Take me to Home</Link>
                </div>
            </div>
        </>
    );
};


export default SignInForm;