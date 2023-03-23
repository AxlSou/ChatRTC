'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSupabase } from '../../components/supabase-provider'
import { useRouter } from 'next/navigation'

export default function SignUp () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const { supabase, session } = useSupabase()
  const router = useRouter()

  if (session) {
    router.push('/home')
  }

  const handleSignUp = async () => {
    if (password === passwordConf) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password
      })
      console.log(data)
      console.error(error)
      router.push('/signUp/username')
    } else {
      throw Error("Passwords don't match")
    }
  }

  return (
    <main>
      <div className='container h-screen grid place-content-center'>
        <form className='w-96 h-auto p-12 bg-secondary rounded-md shadow-md' onSubmit={handleSignUp}>
          <h1 className='text-3xl font-bold text-white text-center underline mb-16'>Sign Up</h1>
          <div className='flex flex-col text-left text-white'>
            <label className='text-lg mb-1'>Email:</label>
            <input className='rounded-md mb-6 py-1 px-2 bg-primary focus:outline-none' type='email' onChange={(e) => setEmail(e.currentTarget.value)} />
            <label className='text-lg mb-1'>Password:</label>
            <input className='rounded-md mb-6 py-1 px-2 bg-primary focus:outline-none' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
            <label className='text-lg mb-1'>Confirm password:</label>
            <input className='rounded-md mb-6 py-1 px-2 bg-primary focus:outline-none' type='password' onChange={(e) => setPasswordConf(e.currentTarget.value)} />
            <input className='bg-tertiary rounded-md p-2 text-lg mt-8 mb-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60' type='submit' />
          </div>
          <label className='text-white'>Already have an account?</label>
          <Link className='text-tertiary ml-2 hover:cursor-pointer shadow-lg hover:bg-opacity-80 transition-all active:bg-opacity-60' href='/'>Sign In</Link>
        </form>
      </div>
    </main>
  )
}
