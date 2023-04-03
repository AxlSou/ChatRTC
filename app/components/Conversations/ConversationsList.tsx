import retrieveConversations from '@/app/utils/retrieveConversations'
import Link from 'next/link'
import { createServerClient } from '@/app/utils/supabase-server'

export default async function ConversationsList () {
  const supabase = createServerClient()
  const {
    data: { session }
  } = await supabase.auth.getSession()
  const { data } = await retrieveConversations(session?.user.id)

  return (
    <ul>
      {data?.map((item) => {
        return (
          <li className='w-full flex' key={item.id}>
            <Link className='w-full bg-slate-300 py-4 border border-black cursor-pointer hover:bg-slate-400' href={`/${item.id}`}>{item.id}</Link>
          </li>
        )
      })}
    </ul>
  )
}
