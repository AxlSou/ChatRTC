'use client'

import { useSupabase } from '@/app/components/supabase-provider'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CreateUserName () {
  const [username, setUsername] = useState('')
  const { supabase, session } = useSupabase()
  const router = useRouter()

  const checkUsername = async () => {
    const checkUsername = await supabase.from('users').select('Username').eq('id', session?.user.id)
    if (checkUsername.data![0].Username) router.push('/home')
  }

  if (!session) {
    router.push('/')
  } else {
    checkUsername()
  }

  const insertUsername = async () => {
    const { error } = await supabase.from('users').update({ Username: username }).eq('id', session?.user.id)
    if (error) console.log(error)
  }

  return (
    <main>
      <div className='container h-screen grid place-content-center'>
        <form className=' w-fit h-auto p-12 bg-secondary rounded-md shadow-md' onSubmit={insertUsername}>
          <h1 className='text-3xl font-bold text-white text-center underline mb-10'>Create your username</h1>
          <div className='flex flex-col text-left text-white'>
            <label className='text-lg mb-1'>Username:</label>
            <input className='rounded-md mb-6 py-1 px-2 bg-primary focus:outline-none' type='text' onChange={(e) => setUsername(e.target.value)} />
            <input
              className='bg-tertiary rounded-md p-2 text-lg mt-4 mb-2 hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60'
              type='submit'
              value='Create'
            />
          </div>
        </form>
      </div>
    </main>
  )
}
