import { User } from './NewChat'

interface Participants {
    participants: Array<User>
    removeParticipant: (user: string) => void
}

export default function ParticipantsList ({ participants, removeParticipant }: Participants) {
  return (
    <>
      <div className='divider'>
        <label>Chat participants selected:</label>
      </div>
      <div className='flex gap-2'>
        {participants.map((p) => (
          <label className='bg-slate-200 py-1 px-2 rounded-sm flex grow-0 font-medium' key={p.Username}>
            {p.Username}
            <svg className='w-4 ml-1 cursor-pointer' onClick={() => removeParticipant(p.Username!)} fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
              <path stroke-linecap='round' stroke-linejoin='round' d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
          </label>
        ))}
      </div>
    </>
  )
}
