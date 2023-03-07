import Link from 'next/link'
import { FC } from 'react'

const Hero: FC = () => {
  return (
    <div
      className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16"
      style={{ height: 630 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/09/30/backpack-1868720_960_720.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gray-900 bg-opacity-50"
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-5xl tracking-tight text-white sm:text-5xl">
          NEW IN
        </h2>
        <p className="mt-3 text-6xl text-white">Lorem ipsum & Lorem ipsum</p>
        <Link href="/search/fritid/utrustning">
          <div className="mt-8 block w-full rounded-2xl border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto">
            SHOP NOW
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Hero
