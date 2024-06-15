import FormField from '@/components/FormField'
import MagicButton from '@/components/MagicButton'
import images from '@/constants/images'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function SignIn() {
    return (
        <div className='flex items-center justify-center min-h-screen z-20 '>
            <div
                className="w-full flex flex-col  max-w-lg min-h-[60vh] px-4 my-6 py-20 bg-black-100  shadow-custom  shadow-purple rounded-[10px] overflow-hidden"
            >
                <p className="text-3xl font-light text-gray-200 py-10 font-sans">
                Log in to <span className='font-bold text-purple text-[35px]'>Arbitrer</span>
                </p>

                <FormField
                    title="Email"
                    otherStyles="mt-7"
                    keyboardType="email-address"
                />

                <FormField
                    title="Password"
                    otherStyles="mt-7"
                />


                <div className="w-full flex items-center justify-center">
                <MagicButton otherClasses='w-full' title="Sign in" />

                </div>
                <div className="flex justify-center pt-5 flex-row gap-2">
                    <p className="text-lg text-gray-100 font-pregular">
                        Don't have an account?
                    </p>
                    <Link
                        href="/sign-up"
                        className="text-lg font-psemibold text-purple"
                    >
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignIn
