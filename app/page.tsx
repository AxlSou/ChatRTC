import InputMessage from './components/InputMessage'
import SignOut from './components/SignOut'
import { fetchMessages } from './utils/retrieveMessages'

export default async function Main () {
  const data = await fetchMessages()

  return (
    <main>
      <div className='container h-screen py-8 grid grid-cols-[400px,_1fr] grid-rows-1'>
        <div className='bg-white col-span-1 grid grid-rows-[60px,45px,_1fr]'>
          <header className='bg-red-500 p-2 flex justify-between items-center'>
            <h1>Photo</h1>
            <SignOut />
          </header>
          <div className='bg-yellow-300 p-2'>Search</div>
          <div className='bg-purple-300 p-2'>Chat List</div>
        </div>
        <div className='bg-blue-300 col-start-2 row-span-1 grid grid-rows-[60px,_1fr,_65px]'>
          <header className='bg-red-300 p-2'>
            <h1>Name</h1>
          </header>
          <div className='px-12'>
            <pre>{data}</pre>
          </div>
          <InputMessage />
        </div>
      </div>
    </main>
  )
}
