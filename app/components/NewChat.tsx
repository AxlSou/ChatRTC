'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSupabase } from './supabase-provider'

interface User {
  id: string;
  first_name: string | null;
}

export default function SearchBar () {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [userList, setUserList] = useState<User[]>()
  const { supabase } = useSupabase()

  const closeModal = () => setIsOpen(false)

  const openModal = () => setIsOpen(true)

  // eslint-disable-next-line no-undef
  const onSearch = async (event: React.FormEvent) => {
    event.preventDefault()
    const { data } = await supabase.from('users').select('id, first_name').ilike('first_name', '%' + query + '%')
    if (data) setUserList(data)
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='w-full rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
      >
        Start or find a conversation
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    Who are you looking for?
                  </Dialog.Title>
                  <div className='relative mt-4 rounded-md shadow-sm'>
                    <form id='searchForm' onSubmit={onSearch}>
                      <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'>
                        <span className='text-gray-500 sm:text-sm'>
                          <MagnifyingGlassIcon className='h-5 w-5 text-gray-700' />
                        </span>
                      </div>
                      <input
                        type='text'
                        name='price'
                        id='price'
                        className='block w-full rounded-md border-0 py-1.5 pl-9 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                        placeholder='Enter a username'
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </form>
                  </div>

                  <div className='mt-4'>
                    <button
                      type='submit'
                      form='searchForm'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    >
                      Search
                    </button>
                  </div>
                  <div className='mt-4'>
                    <ul className='flex items-center'>
                      {userList?.length === 0
                        ? 'User not found'
                        : userList?.map((user) => (
                          <li className='w-full' key={user.first_name}>{user.first_name}</li>
                        ))}
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
