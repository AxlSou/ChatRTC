import 'server-only'

import * as React from 'react'
import SupabaseListener from '../components/supabase-listener'
import SupabaseProvider from '../components/supabase-provider'
import './globals.css'
import { createServerClient } from '../utils/supabase-server'
import InputMessage from '../components/InputMessage'
import SearchBar from '../components/NewConversations/NewChat'
import SignOut from '../components/SignOut'

export const revalidate = 0

export default async function RootLayout ({ children }: { children: React.ReactNode }) {
  const supabase = createServerClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  return (
    <html lang='en'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='bg-primary'>
        <SupabaseProvider session={session}>
          <SupabaseListener serverAccessToken={session?.access_token} />
          <div className='container h-screen py-8 grid grid-cols-[400px,_1fr] grid-rows-1'>
            <div className='bg-white col-span-1 grid grid-rows-[60px,45px,_1fr]'>
              <header className='bg-red-500 p-2 flex justify-between items-center'>
                <h1>Photo</h1>
                <SignOut />
              </header>
              <div className='bg-yellow-300 p-2 flex items-center'><SearchBar /></div>
              <div className='bg-purple-300 p-2'>Chat List</div>
            </div>
            <div className='bg-blue-300 col-start-2 row-span-1 grid grid-rows-[60px,_1fr,_65px]'>
              <header className='bg-red-300 p-2'>
                <h1>Name</h1>
              </header>
              <div className='px-12'>
                {children}
              </div>
              <InputMessage />
            </div>
          </div>
        </SupabaseProvider>
      </body>
    </html>
  )
}
