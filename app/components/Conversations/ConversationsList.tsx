import retrieveConversations from '@/app/utils/retrieveConversations'
// import { createServerClient } from '@/app/utils/supabase-server'

interface UserSession {
    sessionId: string | undefined
}

export default async function ConversationsList ({ sessionId }: UserSession) {
  // const supabase = createServerClient()
  const { data } = await retrieveConversations(sessionId)
  console.log(data)

  return (
    <ul>
      {data?.map((item) => {
        return (
          <li key={item.id}>{item.id}</li>
        )
      })}
    </ul>
  )
}
