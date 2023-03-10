import { HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  list: any[]
}

const Breadcrumbs: FC<Props> = ({ list }) => {
  console.log(list)
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        {/* <li>
          <div>
            <Link href="/" className="text-gray-400 hover:text-gray-500">
              <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li> */}
        {list.map((page, i) => (
          <li key={page.name}>
            <div className="flex items-center">
              {i == 0 ? null : (
                <svg
                  className="h-5 w-3 flex-shrink-0 text-gray-300 sm:w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                </svg>
              )}

              <Link
                href={'/search' + page.path}
                className={
                  i == 0
                    ? 'text-xs font-medium text-gray-500 hover:text-gray-700 '
                    : 'ml-2 text-xs font-medium text-gray-500 hover:text-gray-700 sm:ml-4'
                }
                aria-current={page.current ? 'page' : undefined}
              >
                {page.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs
