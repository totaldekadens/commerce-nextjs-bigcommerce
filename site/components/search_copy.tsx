import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import type { Brand } from '@commerce/types/site'
import type { Product } from '@commerce/types/product'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Container, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'
import rangeMap from '@lib/range-map'

const SORT = {
  'trending-desc': 'Trending',
  'latest-desc': 'Latest arrivals',
  'price-asc': 'Price: Low to high',
  'price-desc': 'Price: High to low',
}

import {
  filterQuery,
  getCategoryPath,
  getDesignerPath,
  useSearchMeta,
} from '@lib/search'
import ErrorMessage from './ui/ErrorMessage'
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  ChevronDownIcon,
  FunnelIcon,
  HomeIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import getSlug from '@lib/get-slug'
import {
  getActiveCategory,
  getActiveCategoryTree,
} from '@lib/hooks/useCategoryHooks'
import { sortOptions } from '@lib/data/navigation'
import Breadcrumbs from './common/Breadcrumbs/Breadcrumbs'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export default function SearchCopy({
  categories,
  brands,
  categoryTree,
}: SearchPropsType) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<any>([])
  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)

  // Gets the last slug in path
  let getLength = router.query.category?.length

  let activeCategorySlug = router.query.category
    ? router.query.category[getLength ? getLength - 1 : 0]
    : undefined

  // Gets active category
  const activeCategory = getActiveCategory(categoryTree, activeCategorySlug)

  // Gets all sub categories
  const activeCategoryTree = getActiveCategoryTree(
    categoryTree,
    activeCategorySlug
  )

  const activeBrand = brands.find((b: Brand) => b.slug === brand)

  const { data, error } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.entityId,
    brandId: activeBrand?.id,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })

  /* Breadbrumbs */

  const splittedPaths = asPath.split('/')

  const categoryObjectsFromPath = splittedPaths.map((path) => {
    return getActiveCategoryTree(categoryTree, path)
  })
  // Filter out empty objects
  const newArray = categoryObjectsFromPath.filter(
    (value) => Object.keys(value).length !== 0
  )

  const list: any[] = []
  newArray.forEach((category) => {
    const foundIndex = splittedPaths.findIndex(
      (path) => path == getSlug(category.path)
    )
    const newPaths = splittedPaths.slice(0, foundIndex + 1)
    const copy = { ...category }
    copy.path = newPaths.join('/')
    category = copy
    list.push(category)
  })

  // Filtering all options of displayed products
  useEffect(() => {
    if (data) {
      const names: any[] = []
      const getData = data.products.filter(
        (product) => product.options.length > 0
      )
      getData.forEach((product) => {
        return product.options.map((option) => {
          const findDisplayName = names.find(
            (item) => item.name == option.displayName
          )
          if (!findDisplayName) {
            names.push({ name: option.displayName, values: [] })
          }
          option.values.forEach((value) => {
            const findDisplayName: any = names.find(
              (item) => item.name == option.displayName
            )
            const findValue = findDisplayName.values.find(
              (hej: any) => hej == value.label
            )
            if (!findValue) {
              findDisplayName.values.push(value.label)
            }
          })
        })
      })
      setFilters(names)
    }
  }, [data])

  if (error) {
    return <ErrorMessage error={error} />
  }

  //console.log(filters1)

  /*   const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  } */

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
            style={{ zIndex: 100000 }}
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

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {categories.map((category) => (
                        <li key={category.name}>
                          <Link href={'search/' + category.slug}>
                            <div className="block px-2 py-3">
                              {category.name}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section: any) => (
                      <Disclosure
                        as="div"
                        key={section.name}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.values.map(
                                  (option: any, optionIdx: number) => (
                                    <div
                                      key={option}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option}
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-20 pb-6">
            <div>
              <Breadcrumbs list={list} />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 pt-4">
                {activeCategory?.name}
              </h1>
            </div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {!activeCategoryTree.children ||
                  activeCategoryTree.children.length < 1
                    ? null
                    : activeCategoryTree.children.map((category: any) => (
                        <li key={category.name}>
                          <Link href={asPath + '/' + getSlug(category.path)}>
                            {category.name}
                          </Link>
                        </li>
                      ))}
                </ul>

                {filters.map((section: any) => (
                  <Disclosure
                    as="div"
                    key={section.name}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.values.map(
                              (option: any, optionIdx: number) => (
                                <div key={option} className="flex items-center">
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option}
                                  </label>
                                </div>
                              )
                            )}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
              {/* Product grid */}
              {!data ? null : (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
                  {data.products.map((product) => (
                    <Link key={product.id} href={'/product/' + product.slug}>
                      {/*  <a className="group text-sm"> */}
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <img
                          src={product.images[0].url}
                          alt={product.images[0].alt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <ul
                        role="list"
                        className="mt-auto flex items-center space-x-3 pt-4 pl-2"
                      >
                        {product.options
                          ? product.options.map((option: any) => {
                              if (
                                option.displayName == 'Color' ||
                                option.displayName == 'Färg'
                              ) {
                                return option.values.map(
                                  (value: any, i: number) => {
                                    return (
                                      <li
                                        key={i}
                                        className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                        style={{
                                          backgroundColor: value.hexColors
                                            ? value.hexColors[0]
                                            : value.label,
                                        }}
                                      >
                                        <span className="sr-only">
                                          {' '}
                                          {value.hexColors
                                            ? value.hexColors[0]
                                            : value.label}{' '}
                                        </span>
                                      </li>
                                    )
                                  }
                                )
                              }
                            })
                          : null}
                      </ul>
                      <h3 className="mt-4 font-medium text-gray-900  pl-2">
                        {product.name}
                      </h3>
                      <p className="italic text-gray-500  pl-2">
                        {/* {product.availability} */}
                      </p>
                      <p className="mt-2 font-medium text-gray-900  pl-2">
                        {product.price.value + ' ' + product.price.currencyCode}
                      </p>
                      {/*  </a> */}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

SearchCopy.Layout = Layout
