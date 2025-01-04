'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { authFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
 


const AuthForm = ({type} : {type: string}) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof authFormSchema>>({
        resolver: zodResolver(authFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
     
      // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof authFormSchema>) {
    setIsLoading(true)
    console.log(values)
    setIsLoading(false)
    }
    return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
        <Link href='/' className='cursor-pointer items-center gap-1'>
            <Image
                src='/icons/aurum-logo.svg'
                width={100}
                height={100}
                alt='Aurum Logo'
            />
        </Link>
        <div className='flex flex-col gap-1 md:gap-3'>
            <h1 className='text-24 lg:text-36 font-semibold text-gray-900'>
                    {
                        user
                        ? 'Link Account'
                        : type === 'sign-in'
                            ? 'Sign In'
                            : 'Sign Up'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {
                            user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
            </h1>
        </div>
        </header>
        {user ? (
            <div className='flex flex-col gap-4'>
                plaid
            </div>
        ) : 
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CustomInput
                        control={form.control}
                        name='email'
                        label='Username'
                        placeholder='Enter your username'
                    />
                    <CustomInput
                        control={form.control}
                        name='password'
                        label='Password'
                        placeholder='Enter your password'
                    />
                    <div className='flex flex-col gap-4 mb-4'>
                    <Button type="submit" className='form-btn' disabled={isLoading}>
                        {isLoading ? (<><Loader2 size={20} className='animate-spin'/> &nbsp; Loading...</>) : type === 'sign-in' ? 'Sign in' : 'Sign Up'}
                    </Button>
                    </div>

                </form>
            </Form>

            <footer className='flex justify-center gap-1 mt-2'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in' ? `Don't have an account?` : `Already have an account?`}
                </p>
                <Link className='form-link 'href={type === 'sign-in' ? `/sign-up` : `/sign-in`}>
                    {type === 'sign-in' ? `Sign up` : `Sign in`}
                </Link>
            </footer>
        </div>}
    </section>
    )
}

export default AuthForm