'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSupabase } from '../../components/supabase-provider'

export default function SignIn () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { supabase, session } = useSupabase()
  const router = useRouter()

  if (session) {
    router.push('/')
  }

  const handleEmailLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) console.log(error)
  }

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
    if (error) console.log(error)
  }

  return (
    <div className='container h-screen grid place-content-center'>
      <form className='w-96 h-auto p-12 bg-secondary rounded-md shadow-md' onSubmit={handleEmailLogin}>
        <h1 className='text-3xl font-bold text-white text-center underline mb-16'>Sign In</h1>
        <div className='flex flex-col text-left text-white'>
          <label className='text-lg mb-1'>Email:</label>
          <input className='rounded-md mb-8 py-1 px-2 bg-primary focus:outline-none' type='text' onChange={(e) => setEmail(e.currentTarget.value)} />
          <label className='text-lg mb-1'>Password:</label>
          <input className='rounded-md mb-8 py-1 px-2 bg-primary focus:outline-none' type='password' onChange={(e) => setPassword(e.currentTarget.value)} />
          <input
            className='bg-tertiary rounded-md p-2 text-lg mt-8 mb-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60'
            type='submit'
            value='Sign In'
          />
          <button
            className='bg-tertiary rounded-md p-2 text-lg mt-2 mb-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60 flex justify-center gap-3'
            type='button'
            onClick={signInWithGitHub}
          >
            <svg height='32' aria-hidden='true' viewBox='0 0 16 16' version='1.1' width='32' data-view-component='true' className='fill-white h-6 w-6 mt-0.5'>
              <path fillRule='evenodd' d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z' />
            </svg>
            Continue with Github
          </button>
        </div>
        <label className='text-white'>Need an account?</label>
        <Link className='text-tertiary ml-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60' href='/signUp'>Register</Link>
      </form>
    </div>
  )
}
