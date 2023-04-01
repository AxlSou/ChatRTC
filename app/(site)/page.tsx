import { createServerClient } from '@/app/utils/supabase-server'
import { redirect } from 'next/navigation'
import { fetchMessages } from '../utils/retrieveMessages'

export default async function Main () {
  const data = await fetchMessages()
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

  return (
    <main>
      <pre>{data}</pre>
    </main>
  )
}
