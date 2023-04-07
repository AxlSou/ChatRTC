'use client'

import { useEffect, useState } from 'react'
import { Database } from '@/app/types/database'
import { useSupabase } from '@/app/components/supabase-provider'

type Message = Database['public']['Tables']['messages']['Row']

export default function RealTimeMessages ({ serverMessages }: { serverMessages: Message[]}) {
  const { supabase, session } = useSupabase()
  const [messages, setMessages] = useState(serverMessages)
  const conversationId = messages.map(item => item.conversation_id).slice(0, 1).join('')

  useEffect(() => {
    if (conversationId) {
      const channel = supabase
        .channel('realtime messages')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'messages',
            filter: `conversation_id=eq.${conversationId}`
          },
          (payload) => {
            setMessages([...messages, payload.new as Message])
          }
        )
        .subscribe()

      return () => {
        supabase.removeChannel(channel)
      }
    }
  }, [supabase, messages, setMessages])

  return (
    <>
      {messages && messages.map((item) => {
        return (
          <div key={item.id} className={`chat ${item.user_id === session?.user.id ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${item.user_id === session?.user.id ? 'bg-blue-500' : null}`}>{item.content}</div>
          </div>
        )
      })}
    </>
  )
}
