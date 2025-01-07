'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import CustomInput from './CustomInput'

import { Loader2 } from 'lucide-react'
import { authSchema, AuthSchemaType, AuthType } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { signIn, signUp } from '@/lib/actions/user.actions'

interface AuthFormProps {
    type: AuthType
}

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null);

    const getDefaultValues = () => ({
        email: "",
        password: "",
        ...(type === "sign-up" && {
            firstName: "",
            lastName: "",
            address: "",
            state: "",
            postalcode: "",
            dateOfBirth: "",
            ssn: "",
        })
    });

    const form = useForm<AuthSchemaType<typeof type>>({
        mode: "onBlur",
        resolver: zodResolver(authSchema[type]),
        defaultValues: getDefaultValues(),
    });

    const onSubmit = async (values: AuthSchemaType<typeof type>) => {
        setIsLoading(true)
        try {
            //sign-up w appwrite & create token
            if(type === 'sign-up'){
                const newUser = await signUp(values);

                setUser(newUser);


            }
            if(type === 'sign-in'){
                const returnedUser = await signIn(values)
                if(returnedUser) router.push('/')
            }

            
        } catch (error) {
            console.log(error)
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='auth-form'>
            <header className='flex flex-col gap-5 md:gap-5'>
                <Link href='/' className='cursor-pointer items-center gap-1'>
                    <Image
                        src='/icons/aurum-logo-cut.svg'
                        width={100}
                        height={100}
                        alt='Aurum Logo'
                    />
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user 
                        ? 'Link Account'
                        : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign Up'
                    }</h1>
                    <p className="text-16 font-normal text-gray-600">
                        {user 
                        ? 'Link your account to get started'
                        : 'Please enter your details'
                        }
                    </p>  
                    
                </div>
            </header>
            {!user && (<>
                <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomInput
                        control={form.control}
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                    />
                    <CustomInput
                        control={form.control}
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    {type === 'sign-up' && (
                        <>
                            <div className='grid grid-cols-2 w-full gap-4'>
                            <CustomInput
                                control={form.control}
                                name="firstName"
                                label="First Name"
                                placeholder="Enter your first name"
                            />
                            <CustomInput
                                control={form.control}
                                name="lastName"
                                label="Last Name"
                                placeholder="Enter your last name"
                            />
                            </div>
                            <CustomInput
                                control={form.control}
                                name="city"
                                label="City"
                                placeholder="Enter your city"
                            />
                            <CustomInput
                                control={form.control}
                                name="address"
                                label="Address"
                                placeholder="Enter your address"
                            />
                            <div className='grid grid-cols-2 w-full gap-4'>
                            <CustomInput
                                control={form.control}
                                name="state"
                                label="State"
                                placeholder="Example: CA"
                            />
                            <CustomInput
                                control={form.control}
                                name="postalcode"
                                label="Postal Code"
                                placeholder="Enter your postal code"
                            />
                            </div>
                            <CustomInput
                                control={form.control}
                                name="ssn"
                                label="SSN"
                                placeholder="Enter your SSN"
                            />
                            <CustomInput
                                control={form.control}
                                name="dateOfBirth"
                                label="Date of Birth"
                                placeholder="Enter your date of birth"
                            />
                        </>
                    )}
                    <div className='flex flex-col gap-4 mb-4'>
                        <Button type="submit" className='form-btn' disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 size={20} className='animate-spin' />
                                    &nbsp; Loading...
                                </>
                            ) : type === 'sign-in' ? 'Sign in' : 'Sign Up'}
                        </Button>
                    </div>
                </form>
            </Form>

            <footer className='flex justify-center gap-1 mt-2'>
                <p className='text-14 font-normal text-gray-600'>
                    {type === 'sign-in' ? `Don't have an account?` : `Already have an account?`}
                </p>
                <Link
                    className='form-link'
                    href={type === 'sign-in' ? `/sign-up` : `/sign-in`}
                >
                    {type === 'sign-in' ? `Sign up` : `Sign in`}
                </Link>
            </footer>
            </>)}

        </section>
    )
}

export default AuthForm