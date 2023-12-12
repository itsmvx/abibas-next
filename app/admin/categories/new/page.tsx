'use client'
import AdminContentWrapper from "@/app/admin/components/AdminContentWrapper";
import { useEffect, useState } from "react";

type FormStateType = {
    name: {
        value: string;
        onChecking: boolean;
        checkStatus: boolean | null;
        inValid: boolean;
        filled: boolean;
        onError: boolean;
    };
    slug: string;
    description: string;
    images: File[];
    audience: string;
}
const NewCategories = () => {
    const [formState, setFormState] = useState<FormStateType>({
        name: {
            value: '',
            onChecking: false,
            checkStatus: null,
            inValid: true,
            filled: true,
            onError: true
        },
        slug: '',
        description: '',
        images: [],
        audience: ''
    });
    const checkUniqueName = async (name: string) => {
        setFormState((prevState) => ({
            ...prevState,
            name: {
                ...prevState.name,
                onChecking: true,
                onError: false
            }
        }));
        try {
            const res = await fetch(`/api/categories?check=${name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json',
                },
                cache: 'no-store'
            });
            if (!res.ok) {
                setFormState((prevState) => ({
                    ...prevState,
                    name: {
                        ...prevState.name,
                        checkStatus: false,
                    }
                }));
            }
            else {
                setFormState((prevState) => ({
                    ...prevState,
                    name: {
                        ...prevState.name,
                        checkStatus: true,
                    }
                }));
            }
        } catch (error) {
            setFormState((prevState) => ({
                ...prevState,
                name: {
                    ...prevState.name,
                    onError: true
                }
            }));
        } finally {
            setFormState((prevState) => ({
                ...prevState,
                name: {
                    ...prevState.name,
                    onChecking: false
                }
            }));
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (formState.name.value !== "") {
                checkUniqueName(formState.name.value);
            }
        }, 2000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [formState.name.value]);

    return (
        <AdminContentWrapper>
            <div className="w-full min-h-screen ring-[0.5px] ring-zinc-400 pb-2 bg-white rounded-md">
                <h1 className="pt-10 pb-5 indent-10 text-lg font-semibold">
                    CREATE NEW CATEGORIES
                </h1>

                <form className="mx-10 relative md:h-full w-full flex flex-row justify-start gap-y-8">
                    <div className="basis-2/5">
                        <div className="relative flex flex-col w-72">
                            <label htmlFor="fullname" className="font-medium text-sm">Categories Name</label>
                            <input
                                id="fullname"
                                autoComplete="on"
                                type="text"
                                name="fullname"
                                onChange={(event) => {
                                    if (event.target.value === '') {
                                        setFormState((prevState) => ({
                                            ...prevState,
                                            name: {
                                                ...prevState.name,
                                                filled: false,
                                                value: event.target.value
                                            }
                                        }))
                                    }
                                    else {
                                        setFormState((prevState) => ({
                                            ...prevState,
                                            name: {
                                                ...prevState.name,
                                                filled: true,
                                                value: event.target.value
                                            }
                                        }));
                                        // clearTimeout(nameInputTimeout);
                                        // nameInputTimeout = setTimeout(() => {
                                        //     checkUniqueName(event.target.value);
                                        // }, 2000)
                                    }
                                }}
                                className="peer w-full border-b-2 outline-none border-b-zinc-800"
                            />
                            <iconify-icon
                                width={18}
                                class={`${ formState.name.checkStatus === null 
                                    ? 'text-black'
                                    : formState.name.checkStatus 
                                        ? 'text-green-500'
                                        : 'text-red-600'} 
                                    ${ formState.name.onChecking 
                                        ? 'animate-spin'
                                        : ''} absolute -right-5 top-5` }
                                icon={ formState.name.checkStatus === null
                                    ? 'mdi:autorenew'
                                    : formState.name
                                        ? 'line-md:circle-to-confirm-circle-transition'
                                        : 'line-md:close-circle'
                                }>

                            </iconify-icon>
                            <p className={`${formState.name.filled ? 'invisible' : 'visible'} absolute -bottom-5 text-xs text-red-700`}>
                                Full Name field must be filled.
                            </p>
                            <p className={`${formState.name.checkStatus ? 'invisible' : 'visible'} absolute -right-14 -bottom-5 text-xs text-red-700`}>
                                Name already used
                            </p>
                        </div>
                    </div>

                    <div className="border-l-2 basis-auto h-full">
                        ewe
                    </div>
                </form>
            </div>

        </AdminContentWrapper>
    )
}
export default NewCategories
