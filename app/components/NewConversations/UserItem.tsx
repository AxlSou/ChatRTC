import { User } from './NewChat'

interface Username {
    user: User
    handleSelect: (user: User) => void
}

export default function UserItem ({ user, handleSelect }: Username) {
  return (
    <>
      <div className='w-full flex justify-between items-center mb-4 p-2 hover:bg-slate-200 rounded-sm'>
        <div>
          <div className='avatar placeholder mr-4'>
            <div className='bg-primary text-neutral-content rounded-full w-10'>
              <span className='text-s'>{user.Username && user.Username[0]}</span>
            </div>
          </div>
          <label className='text-bold'>{user.Username}</label>
        </div>
        <button
          className='px-4 py-2 text-sm font-medium bg-tertiary rounded-md text-white hover:cursor-pointer hover:bg-opacity-80 transition-all active:bg-opacity-60 focus:outline-none'
          onClick={() => handleSelect(user)}
        >
          Select
        </button>
      </div>
    </>
  )
}
