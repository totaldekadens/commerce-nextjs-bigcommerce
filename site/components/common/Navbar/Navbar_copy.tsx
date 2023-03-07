import { FC } from 'react'
import { Searchbar, UserNav } from '@components/common'
import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
//import { navigation } from '../../utils/data/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { hideContext } from '../../context/HideProvider'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import Cart from '../Cart'
import { navigation } from '@lib/data/navigation'
import UserNavCopy from '../UserNav/UserNav_Copy'
import getSlug from '@lib/get-slug'
function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Link {
  entityId: number
  name: string
  path: string
  __typename: string
  children: Link[]
  productCount: number
  description?: string
}

interface NavbarProps {
  links?: Link[]
}

const NavbarCopy: FC<NavbarProps> = ({ links }) => {
  const [open, setOpen] = useState(false)
  const [USPheight, setUSPHeight] = useState(40)
  const { hide, hideUSP, scrollY } = useContext<any>(hideContext)
  const { width, height } = useWindowSize()
  const [openCart, setOpenCart] = useState(false)

  // Removes "Home"
  links = links?.filter((link) => link.name != 'Home')

  useEffect(() => {
    if (scrollY < 41) {
      setUSPHeight(40 - scrollY)
    }
  }, [scrollY])

  return (
    <>
      <p
        className={`flex items-center justify-center bg-neutral-500 px-4 text-sm font-medium text-white sm:px-6 lg:px-8`}
        style={{
          height: 40,
        }}
      >
        Get free delivery on orders over $100
      </p>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            style={{ zIndex: 100 }}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0  flex" style={{ zIndex: 100 }}>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl z-60">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2 z-100 ">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {!links
                          ? null
                          : links.map((category) => (
                              <Tab
                                key={category.name}
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? 'text-indigo-600 border-indigo-600'
                                      : 'text-gray-900 border-transparent',
                                    'flex-1 whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium'
                                  )
                                }
                              >
                                {category.name}
                              </Tab>
                            ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-10 px-4 pt-10 pb-8"
                        >
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div
                                key={item.name}
                                className="group relative text-sm"
                              >
                                <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img
                                    src={item.imageSrc}
                                    alt={item.imageAlt}
                                    className="object-cover object-center"
                                    onClick={() => setOpen(false)}
                                  />
                                </div>
                                <Link href={'/search/' + item.href}>
                                  <div
                                    className="mt-6 block font-medium text-gray-900"
                                    onClick={() => setOpen(false)}
                                  >
                                    <span
                                      className="absolute inset-0 z-10"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </div>
                                </Link>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text-gray-900"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li
                                    key={item.name}
                                    className="flow-root"
                                    onClick={() => setOpen(false)}
                                  >
                                    <Link
                                      href={'/search/' + item.href}
                                      onClick={() => setOpen(false)}
                                    >
                                      <div
                                        className="-m-2 block p-2 text-gray-500 "
                                        onClick={() => setOpen(false)}
                                      >
                                        {item.name}
                                      </div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <Link href={'/' + page.href}>
                          <div className="-m-2 block p-2 font-medium text-gray-900">
                            {page.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                    <div className="flow-root">
                      <Link href="/auth/signin">
                        <div className="-m-2 block p-2 font-medium text-gray-900">
                          Sign in
                        </div>
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link href="/auth/signup">
                        <div className="-m-2 block p-2 font-medium text-gray-900">
                          Create account
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">
                        CAD
                      </span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <div style={{ height: width < 1024 ? 0 : 90 }}>
          <header
            className={
              hideUSP
                ? 'transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 bg-white z-50'
                : 'transition-all duration-300 ease-in-out relative bg-white z-50'
            }
            style={{ opacity: hide ? 0 : 1 }}
          >
            <nav
              aria-label="Top"
              className={
                hide
                  ? 'transition-all duration-300 ease-in-out mx-auto z-50 px-4 py-0 sm:px-6 lg:px-8'
                  : 'transition-all duration-300 ease-in-out mx-auto z-50 px-4 py-0 sm:px-6 lg:px-8 lg:py-3'
              }
              style={{
                transition: 'height 2.5',
                overflow: 'hidden',
                opacity: hide ? 0 : 1,
                height:
                  !hide && hideUSP && width < 1024
                    ? 52
                    : !hide && hideUSP
                    ? 70
                    : !hide && !hideUSP && width < 1024
                    ? 52
                    : hide && hideUSP
                    ? 0
                    : 90,
              }}
            >
              <div>
                <div
                  className={
                    (hide && hideUSP) || (hideUSP && !hide) || width < 1024
                      ? 'flex h-12 items-center'
                      : 'flex h-16 items-center'
                  }
                  style={{ overflow: 'hidden' }}
                >
                  <button
                    type="button"
                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Logo */}
                  <div className="flex lg:ml-0">
                    <Link href="/">
                      <div className="flex item-center">
                        <span className="sr-only">Your Company</span>
                        <Image
                          alt="logo"
                          width={(hide && !hideUSP) || width < 1024 ? 50 : 58}
                          height={(hide && !hideUSP) || width < 1024 ? 50 : 58}
                          src="/logo-whitebg.png"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Flyout menus */}
                  <Popover.Group className="hidden z-60 lg:ml-8 lg:block lg:self-stretch">
                    <div
                      className="flex h-full space-x-8 "
                      id="ettidtest"
                      style={{ paddingBottom: 2, paddingTop: 2 }}
                    >
                      {!links
                        ? null
                        : links.map((category) => (
                            <Popover key={category.name} className="flex">
                              {({ open }) => (
                                <>
                                  <div className="relative flex">
                                    <Popover.Button
                                      className={classNames(
                                        open
                                          ? 'border-indigo-600 text-indigo-600'
                                          : 'border-transparent text-gray-700 hover:text-gray-800',
                                        'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                      )}
                                    >
                                      {category.name}
                                    </Popover.Button>
                                  </div>

                                  <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                  >
                                    <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                                      {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                                      <div
                                        className="absolute inset-0 top-1/2 bg-white shadow"
                                        aria-hidden="true"
                                      />

                                      <div className="relative bg-white">
                                        <div className="mx-auto max-w-7xl px-8">
                                          <div className="grid grid-cols-2 gap-y-10 gap-x-8 py-16">
                                            <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                              {/* Featured */}
                                              {!category.children
                                                ? null
                                                : category.children
                                                    .slice(0, 2)
                                                    .map((item) => (
                                                      <div
                                                        key={item.name}
                                                        className="group relative text-base sm:text-sm"
                                                        onClick={() =>
                                                          setOpen(false)
                                                        }
                                                      >
                                                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                                          {/* placeholder atm */}
                                                          <img
                                                            src={
                                                              'https://cdn.pixabay.com/photo/2016/11/22/19/25/man-1850181_960_720.jpg'
                                                            }
                                                            alt={'bild'}
                                                            className="object-cover object-center"
                                                          />
                                                        </div>
                                                        <Link
                                                          href={
                                                            '/search/' +
                                                            getSlug(item.path)
                                                          }
                                                        >
                                                          <Popover.Button
                                                            className={classNames(
                                                              open ? '' : '',
                                                              ' duration-200 ease-out'
                                                            )}
                                                          >
                                                            <div
                                                              className="mt-6 block font-medium text-gray-900"
                                                              onClick={() =>
                                                                setOpen(false)
                                                              }
                                                            >
                                                              <span
                                                                className="absolute inset-0 z-10"
                                                                aria-hidden="true"
                                                              />
                                                              {item.name}
                                                            </div>
                                                          </Popover.Button>
                                                        </Link>
                                                        <p
                                                          aria-hidden="true"
                                                          className="mt-1"
                                                        >
                                                          Shop now
                                                        </p>
                                                      </div>
                                                    ))}
                                            </div>
                                            <div className="row-start-1 grid grid-cols-3 gap-y-10 gap-x-8 text-sm">
                                              {category.children.length < 1
                                                ? null
                                                : category.children.map(
                                                    (section) =>
                                                      section.children.length <
                                                      1
                                                        ? null
                                                        : section.children.map(
                                                            (section) => (
                                                              <>
                                                                {section
                                                                  .children
                                                                  .length <
                                                                1 ? null : (
                                                                  <>
                                                                    <div
                                                                      key={
                                                                        section.name
                                                                      }
                                                                    >
                                                                      <Link
                                                                        href={
                                                                          '/search/' +
                                                                          getSlug(
                                                                            category.path
                                                                          ) +
                                                                          '/' +
                                                                          getSlug(
                                                                            section.path
                                                                          )
                                                                        }
                                                                      >
                                                                        <Popover.Button
                                                                          className={classNames(
                                                                            open
                                                                              ? ''
                                                                              : '',
                                                                            'duration-200 ease-out'
                                                                          )}
                                                                        >
                                                                          <p
                                                                            id={`${section.name}-heading`}
                                                                            className="font-medium text-gray-900"
                                                                          >
                                                                            {
                                                                              section.name
                                                                            }
                                                                          </p>
                                                                        </Popover.Button>
                                                                      </Link>
                                                                      <ul
                                                                        role="list"
                                                                        aria-labelledby={`${section.name}-heading`}
                                                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                                                      >
                                                                        {section
                                                                          .children
                                                                          .length <
                                                                          1 &&
                                                                        section.productCount <
                                                                          1
                                                                          ? null
                                                                          : section.children.map(
                                                                              (
                                                                                item
                                                                              ) => (
                                                                                <li
                                                                                  key={
                                                                                    item.name
                                                                                  }
                                                                                  className="flex"
                                                                                  onClick={() =>
                                                                                    setOpen(
                                                                                      false
                                                                                    )
                                                                                  }
                                                                                >
                                                                                  <Link
                                                                                    href={
                                                                                      '/search/' +
                                                                                      getSlug(
                                                                                        category.path
                                                                                      ) +
                                                                                      '/' +
                                                                                      getSlug(
                                                                                        section.path
                                                                                      ) +
                                                                                      '/' +
                                                                                      getSlug(
                                                                                        item.path
                                                                                      )
                                                                                    }
                                                                                  >
                                                                                    <Popover.Button
                                                                                      className={classNames(
                                                                                        open
                                                                                          ? ''
                                                                                          : '',
                                                                                        'duration-200 ease-out'
                                                                                      )}
                                                                                    >
                                                                                      <div
                                                                                        className="hover:text-gray-800"
                                                                                        onClick={() =>
                                                                                          setOpen(
                                                                                            false
                                                                                          )
                                                                                        }
                                                                                      >
                                                                                        {
                                                                                          item.name
                                                                                        }
                                                                                      </div>
                                                                                    </Popover.Button>
                                                                                  </Link>
                                                                                </li>
                                                                              )
                                                                            )}
                                                                      </ul>
                                                                    </div>
                                                                  </>
                                                                )}
                                                              </>
                                                            )
                                                          )
                                                  )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </>
                              )}
                            </Popover>
                          ))}

                      {/*  {navigation.pages.map((page) => (
                        <a
                          key={page.name}
                          href={page.href}
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          {page.name}
                        </a>
                      ))} */}
                    </div>
                  </Popover.Group>

                  <div className="ml-auto flex items-center">
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link href="/auth/signin">
                        <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Sign in
                        </div>
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href="/auth/signup">
                        <div className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Create account
                        </div>
                      </Link>
                    </div>

                    <div className="hidden lg:ml-8 lg:flex">
                      <a
                        href="#"
                        className="flex items-center text-gray-700 hover:text-gray-800"
                      >
                        <img
                          src="https://tailwindui.com/img/flags/flag-canada.svg"
                          alt=""
                          className="block h-auto w-5 flex-shrink-0"
                        />
                        <span className="ml-3 block text-sm font-medium">
                          CAD
                        </span>
                        <span className="sr-only">, change currency</span>
                      </a>
                    </div>

                    {/* Search */}
                    <div className="flex lg:ml-6">
                      {process.env.COMMERCE_SEARCH_ENABLED && (
                        <div className="justify-center flex-1 hidden lg:flex">
                          <Searchbar />
                        </div>
                      )}

                      {/*  {process.env.COMMERCE_SEARCH_ENABLED && (
                        <div className="flex pb-4 lg:px-6 lg:hidden">
                          <Searchbar id="mobile-search" />
                        </div>
                      )} */}
                      {/* <a
                        href="#"
                        className="p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Search</span>
                        <MagnifyingGlassIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </a> */}
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-6">
                      {/* <div
                        className="group -m-2 flex items-center p-2"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setOpenCart(true)}
                      >
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          0
                        </span>
                        <span className="sr-only">items in cart, view bag</span>
                      </div> */}
                      <UserNavCopy />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
      </div>
      {/* <Cart setOpen={setOpenCart} open={openCart} /> */}
    </>
  )
}

export default NavbarCopy
