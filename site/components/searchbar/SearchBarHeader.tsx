import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { FC } from 'react'

interface Props {
  searchQuery: any
  setSearchQuery: any
  setSearchBar: any
}

const SearchBarHeader: FC<Props> = ({
  searchQuery,
  setSearchQuery,
  setSearchBar,
}) => {
  return (
    <div className="flex mt-1 p-2 items-center justify-around border-b-2">
      <Image
        alt="hej"
        className=""
        //style={{ position: "absolute" }}
        width={58}
        height={58}
        src="/logo-whitebg.png"
      />
      <div className="relative mt-1 rounded-md shadow-sm flex-col w-2/3 lg:w-1/3">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />{' '}
        </div>
        <input
          value={searchQuery}
          autoComplete="off"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          id="email"
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search..."
        />
      </div>
      <p
        className="cursor-pointer font-normal hover:opacity-80"
        onClick={() => {
          setSearchBar(false)
          setSearchQuery('')
        }}
      >
        Stäng
      </p>
    </div>
  )
}

export default SearchBarHeader
