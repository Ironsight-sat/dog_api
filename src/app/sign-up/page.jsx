'use client'
import React, {  useEffect, useState } from 'react'
import { Form, 
         FormControl,
         FormField,
         FormItem,
         FormLabel,
         FormMessage } from '@/components/ui/form'
import {useRouter} from 'next/navigation'
import {useToast} from '@/hooks/use-toast.js'
import  {useForm} from 'react-hook-form'
import axios ,{AxiosError}from 'axios'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
const SignUpPage = () => {
    const [fullName, setfullName] = useState('')
    const [isSubmiting, setIsSubmiting] = useState(false)
    const router = useRouter()
    const {toast} = useToast()
    const form = useForm({
      defaultValues:{
        fullName: '',
        email: '',
        password: '',
      }
    })
    
   const handleSubmit = async (data) => {
      setIsSubmiting(true)
      try {
        const response = await axios.post('/api/sign-up',data);
        toast({
          title: "Success",
          description: response.data.message,
        })
        router.replace(`/sign-in`)

      } catch (error) {
        console.error('Error during sign-up:', error);
        const axiosError = error ;
          setfullNameMessage(
            axiosError.response?.data.message ?? 'Error checking fullName'
          );
      }finally{
        setIsSubmiting(false)
      }
   }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-100">
  <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white">
        Register Here
      </h1>
      <p className="mb-4 text-gray-400">Sign up</p>
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    setfullName(e.target.value);
                  }}
                  className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Email</FormLabel>
              <Input
                {...field}
                name="email"
                className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Password</FormLabel>
              <Input
                type="password"
                {...field}
                name="password"
                className="bg-gray-700 text-gray-100 border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isSubmiting}
        >
          {isSubmiting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>
    </Form>
    <div className="text-center mt-4">
      <p>
        Already a member?{" "}
        <Link href="/sign-in" className="text-blue-500 hover:text-blue-400">
          Sign in
        </Link>
      </p>
    </div>
  </div>
</div>

  )
}

export default SignUpPage
