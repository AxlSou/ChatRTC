import InputMessage from '../../components/InputMessage'
import { createServerClient } from '@/app/utils/supabase-server'
import { notFound } from 'next/navigation'
import RealTimeMessages from './realTimeMessages'

export const revalidate = 0

export default async function Chat ({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = createServerClient()
  const { data: messages } = await supabase.from('messages').select('*').eq('conversation_id', id)

  if (!messages) notFound()

  return (
    <div className='w-full h-full grid grid-rows-[_1fr,65px]'>
      <div className='bg-blue-300 flex flex-col overflow-y-auto'>
        <RealTimeMessages serverMessages={messages} />
      </div>
      <InputMessage conversationId={id} />
    </div>
  )
}
