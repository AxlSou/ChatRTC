import 'server-only'

import { createServerClient } from './supabase-server'

export default async function searchUsers () {
  const supabase = createServerClient()

  const { data } = await supabase.from('users').select()

  return data
}
