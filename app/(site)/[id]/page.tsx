import InputMessage from '../../components/InputMessage'

export const dynamic = 'force-static'

export default function Chat ({ params }: { params: { id: string } }) {
  const { id } = params
  return (
    <div className='h-full grid grid-rows-[_1fr,65px]'>
      <div>
        <h1>Working!!{id}</h1>
      </div>
      <InputMessage conversationId={id} />
    </div>
  )
}
