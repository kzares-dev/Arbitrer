"use client";
import FormField from '@/components/FormField'
import MagicButton from '@/components/MagicButton'
import { useFormState } from 'react-dom'
import { logUser } from '@/lib/actions/user.action'
import Link from 'next/link'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import FormLoader from '@/components/FormLoader';

const initialState = {
    message: "",
    status: "",
}
function SignIn() {
    const [state, formAction] = useFormState(logUser, initialState);

    useEffect(() => {
        // watch over the state 
        if (state.status === "failed") {
            toast.error(state.message)
        }
        if (state.status === "success") {
            toast.success(state.message);
        }
    }, [state])

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form
                action={formAction}
                className="w-full flex flex-col  max-w-lg min-h-[60vh] px-4 my-6 py-20 bg-white-default z-10 shadow rounded-[10px] overflow-hidden"
            >
                <FormLoader />

                <p className="text-3xl font-light text-black-200 py-10 font-sans">
                    Log in to <span className='font-bold text-black-100 text-[35px]'>Arbitrer</span>
                </p>

                <FormField
                    title="Email"
                    otherStyles="mt-7"
                    name="email"
                />

                <FormField
                    title="Password"
                    otherStyles="mt-7"
                    name="password"
                />


                <div className="w-full flex items-center justify-center">
                    <MagicButton otherClasses='w-full' title="Sign in" />

                </div>
                <div className="flex justify-center pt-5 flex-row gap-2">
                    <p className="text-lg text-black-100 font-sans">
                        Don't have an account?
                    </p>
                    <Link
                        href="/auth/sign-up"
                        className="text-lg font-semibold text-black z-10"
                    >
                        Signup
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SignIn
