'use client'

import { createContext, useContext, useState } from 'react'
import { createClient } from '../utils/supabase-browser'
import * as React from 'react'

import type { SupabaseClient, Session } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../types/database'

type NewSession = Session | null;

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: NewSession;
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider ({ children, session }: { children: React.ReactNode, session: NewSession }) {
  const [supabase] = useState(() => createClient())

  return (
    <Context.Provider value={{ supabase, session }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider')
  } else {
    return context
  }
}
