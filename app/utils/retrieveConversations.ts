import { createServerClient } from './supabase-server'

export default async function retrieveConversations (sessionId: string | undefined) {
  const supabase = createServerClient()

  // retrieving conversations where user is included
  const { data: chatIds } = await supabase
    .from('Conversation')
    .select('id, users:ConversationParticipant!inner(user_id)')
    .eq('users.user_id', sessionId)

  return await supabase
    .from('Conversation')
    .select('id, updated_at, last_message_id(content), ConversationParticipant!inner(user_id(Username))')
    .in('id', [chatIds?.map(chat => chat.id)])
    .filter('ConversationParticipant.user_id', 'neq', sessionId)
}
