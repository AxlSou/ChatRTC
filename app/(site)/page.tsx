import { createServerClient } from '@/app/utils/supabase-server'
import { redirect } from 'next/navigation'
import retrieveConversations from '../utils/retrieveConversations'

export default async function Main () {
  const supabase = createServerClient()

  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session) {
    redirect('/signIn')
  } else {
    const checkUsername = await supabase.from('users').select('Username').eq('id', session?.user.id)
    if (!checkUsername.data![0].Username) redirect('/signUp/username')
  }

  const { data } = await retrieveConversations(session?.user.id)

  return (
    <main>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}
