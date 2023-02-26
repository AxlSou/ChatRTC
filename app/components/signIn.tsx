'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSupabase } from './supabase-provider'
import { useRouter } from 'next/navigation'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { supabase, session } = useSupabase()

  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({ email, password })
  }

  return session
    ? router.push('/home')
    : (
      <div className='container h-screen grid place-content-center'>
        <form className='w-96 h-auto p-12 bg-secondary rounded-md shadow-md'>
          <h1 className='text-3xl font-bold text-white text-center underline mb-16'>Sign In</h1>
          <div className='flex flex-col text-left text-white'>
            <label className='text-lg mb-1'>Email:</label>
            <input className='rounded-md mb-8 py-1 px-2 bg-primary focus:outline-none' type='text' onChange={(e) => setEmail(e.currentTarget.value)} />
            <label className='text-lg mb-1'>Password:</label>
            <input className='rounded-md mb-8 py-1 px-2 bg-primary focus:outline-none' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
            <input
              className='bg-tertiary rounded-md p-2 text-lg mt-8 mb-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60'
              type='submit'
              onSubmit={handleEmailLogin}
            />
          </div>
          <label className='text-white'>Need an account?</label>
          <Link className='text-tertiary ml-2 hover:cursor-pointer shadow-lg hover:bg-opacity-80 transition-all active:bg-opacity-60' href='/signUp'>Register</Link>
        </form>
      </div>
      )
}
