import 'server-only'

import { createServerClient } from './supabase-server'

export const fetchMessages = async () => {
  const supabase = createServerClient()
  const { data } = await supabase.from('messages').select()

  return JSON.stringify({ data }, null, 2)
}
