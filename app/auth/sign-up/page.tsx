"use client"
import FormField from '@/components/FormField'
import MagicButton from '@/components/MagicButton'
import { createUser } from '@/lib/actions/user.action'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const initialState = {
  message: "",
  status: "",
}

function SignUp() {
 
  const [state, formAction] = useFormState(createUser, initialState);
    const router = useRouter();

    useEffect(() => {
        // watch over the state 
        if (state.status === "failed") {
            toast.error(state.message)
        }
        if(state.status === "success") {
            toast.success(state.message);
            router.push("/dashboard");
        }
    }, [state])


  return (
    <div className='flex items-center justify-center min-h-screen z-20 '>
      <form
        action={formAction}
        className="w-full flex flex-col  max-w-lg min-h-[60vh] px-4 my-6 py-20 bg-black-100  shadow-custom  shadow-purple rounded-[10px] overflow-hidden"
      >
        <p className="text-3xl font-light text-gray-200 py-10 font-sans">
          Sign up to <span className='font-bold text-purple text-[35px]'>Arbitrer</span>
        </p>

        <FormField
          title="Email"
          otherStyles="mt-7"
          keyboardType="email-address"
          name="email"
        />
        <FormField
          title="Username"
          otherStyles="mt-7"
          keyboardType="text"
          name="username"

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
          <p className="text-lg text-gray-100 font-pregular">
            Alredy have an account?
          </p>
          <Link
            href="/auth/sign-in"
            className="text-lg font-psemibold text-purple z-10"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp
