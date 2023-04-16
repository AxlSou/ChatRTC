import { createServerClient } from './supabase-server'

export default async function retrieveConversations (sessionId: string | undefined) {
  const supabase = createServerClient()

  // retrieving conversations where user is included
  const { data: chatIds } = await supabase
    .from('Conversation')
    .select('id, users:ConversationParticipant!inner(user_id)')
    .eq('users.user_id', sessionId)

  const { data: chats } = await supabase
    .from('Conversation')
    .select('id, last_message_id(content), ConversationParticipant!inner(user_id(Username))')
    .in('id', [chatIds?.map(chat => chat.id)])
    .filter('ConversationParticipant.user_id', 'neq', sessionId)

  return chats?.map(item => {
    return {
      id: item.id,
      lastMessage: item.last_message_id ? Object.values(item.last_message_id) : null,
      participants: Object.values(item.ConversationParticipant!)
        .map(item => item.user_id.Username)
    }
  })
}
