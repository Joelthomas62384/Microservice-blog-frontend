"use client"

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
   
  } from "@/components/ui/dialog"

import { useAuth } from '@/context'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {z} from "zod"
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from '@/axios'
import { LoginFormData, RegisterFormData } from '@/types'
import RegisterForm from '../forms/register'
import LoginForm from '../forms/login'
import { useToast } from '@/hooks/use-toast'

type Props = {}
const registerSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    full_name: z.string().min(2, { message: 'Full name is required' }).max(50, { message: 'Full name is too long' }),
    username: z.string().min(2, { message: 'Username is required' }).max(50, { message: 'Username is too long' }),
    password: z.string()
      .min(8, { message: 'Password is too short' })
      .max(50, { message: 'Password is too long' })
      .refine((value) => /[A-Z]/.test(value), { message: 'Password must contain at least one uppercase letter' })
      .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), { message: 'Password must contain at least one symbol' }),
  });


  const LoginSchema = z.object({
    email : z.string().email({message : "Invalid email address"}),
    password : z.string(),
  })


const LoginModal = (props: Props) => {
    const { loginModal , loginModalToggle} = useAuth()
    const [activeTab, setActiveTab] = useState('login');
    const {setUserLoggedIn} = useAuth()
    const {toast } = useToast()

    const loginForms = useForm<LoginFormData>({
        resolver : zodResolver(LoginSchema),
        defaultValues:{
            email :'',
            password:''
        }
    })

    const loginSubmit : SubmitHandler<LoginFormData> = async (values) => {
        console.log(values)
        try {
            const response = await axiosInstance.post('api/auth/login', values)
            setUserLoggedIn(true)
            toast({
              title : "Success",
              description : "Logged in successfully",
          variant : "default"
            })

        } catch (error:any) {
            if(error.status===400){

              if (error.response.data.email || error.response.data.username){
                toast({
                  title : "Error",
                  description : error.response.data.email || error.response.data.username,
                  variant:"destructive"
                })
                
              } else if (error.response.data.error){
                toast({
                  title : "Error",
                  description : error.response.data.error,
                  variant:"destructive"
                })
              }
              else{
                toast({
                  title : "Error",
                  description : "An unexpected error occured",
                  variant:"destructive"
                })
              }
            }
        }
        loginModalToggle()
        loginForms.reset()
    }


    const form = useForm<RegisterFormData>({
        resolver : zodResolver(registerSchema),
        defaultValues:{
            email :'',
            full_name:'',
            username:'',
            password:''
        }
    })

    

    const onSubmit: SubmitHandler<RegisterFormData> = async (values) => {
        console.log(values);
        try {
            const response = await axiosInstance.post('api/auth/register', values)
            console.log(response)
            if (response.status === 200) {
              toast({
                title : "Success",
                description : "Registered successfully",
                variant : "default"
              })
            }
        } catch (error:any) {
          
          if(error.status===400){

            if (error.response.data.email || error.response.data.username){
              toast({
                title : "Error",
                description : error.response.data.email || error.response.data.username,
                variant:"destructive"
              })
              
            }else{
              toast({
                title : "Error",
                description : "An unexpected error occured",
                variant:"destructive"
              })
            }
          }
        }
        setActiveTab('login')
        form.reset()
      };
  return (
   <>
   <Dialog open={loginModal} onOpenChange={()=>loginModalToggle()}>
 
  <DialogContent>
    <DialogHeader>
        <DialogTitle>Login/Register</DialogTitle>
    </DialogHeader>
    <Tabs value={activeTab} onValueChange={(value:string)=>setActiveTab(value)}  className="w-full ">
  <div className='w-full flex justify-center items-center'> 
  <TabsList>
    <TabsTrigger value="login">Login</TabsTrigger>
    <TabsTrigger value="register">Register</TabsTrigger>
  </TabsList>
  </div>
  <TabsContent value="register">
  <RegisterForm form={form} onSubmit={onSubmit} />
    
  </TabsContent>
  <TabsContent value="login">
  <LoginForm form={loginForms} onSubmit={loginSubmit}  />
  </TabsContent>
    
</Tabs>
  </DialogContent>
</Dialog>

   </>
  )
}

export default LoginModal;