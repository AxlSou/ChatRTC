'use client'

import * as React from 'react'
import { useState } from 'react'
import { useSupabase } from './supabase-provider'

interface Id {
  conversationId: string
}

export default function InputMessage ({ conversationId }: Id) {
  const [text, setText] = useState('')
  const { supabase } = useSupabase()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    form.reset()
    const { error } = await supabase.from('messages').insert({ content: text, conversation_id: conversationId })
    if (error) {
      throw new Error(String(error))
    }
  }

  return (
    <form className='bg-green-300 p-2 py-3 grid grid-cols-[60px,_1fr,60px] gap-x-2' onSubmit={handleSubmit}>
      <input
        className='col-start-2 px-4 rounded-md focus:outline-none'
        type='text'
        placeholder='Write your message here...'
        onChange={(e) => setText(e.currentTarget.value)}
      />
      <button className='bg-white rounded-md' type='submit'>Send</button>
    </form>
  )
}
