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
import { getEnglishColor } from '@lib/colors'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Value {
  name: string
  value: string
}

interface FilterValue {
  value: string
  checked: boolean
}

interface Filter {
  name: string
  values: FilterValue[]
}

export default function SearchCopy({
  categories,
  brands,
  categoryTree,
}: SearchPropsType) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<Filter[]>([])
  const [values, setValues] = useState<Value[]>([])
  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })
  console.log(categoryTree)
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
  console.log(activeCategorySlug)
  console.log(activeCategoryTree)
  const activeBrand = brands.find((b: Brand) => b.slug === brand)

  const { data, error } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.entityId,
    brandId: activeBrand?.id,
    sort: typeof sort === 'string' ? sort : '',
    locale,
  })
  console.log(activeCategory)
  const [ActiveProducts, setActiveProducts] = useState<Product[]>(
    data ? data.products : []
  )
  // Updates Productlist with filtered products based on whats checked
  useEffect(() => {
    let allValues: Value[] = []
    if (data && data.found) {
      // Creates a list of strings with checked options/values
      filters.forEach((option) => {
        return option.values.forEach((value) => {
          if (value.checked) {
            allValues.push({ name: option.name, value: value.value })
          }
        })
      })
      const currentProducts: Product[] = []
      const currentProducts2: Product[] = []

      data.products.forEach((product) => {
        if (product.options && product.options.length > 0) {
          product.options.forEach((option) => {
            if (allValues.length > 0) {
              allValues.forEach((filter) => {
                if (filter.name == option.displayName) {
                  option.values.forEach((value) => {
                    if (value.label == filter.value) {
                      currentProducts2.push(product)
                      const getMatchedProduct = currentProducts2.filter(
                        (item) => item.id == product.id
                      )
                      if (getMatchedProduct.length == allValues.length) {
                        currentProducts.push(product)
                      }
                      setValues(allValues)
                    }
                  })
                }
              })
            } else {
              setValues([])
            }
          })
        }
      })
      setActiveProducts(currentProducts)
    }
  }, [data, filters])

  /* Breadbrumbs */
  // Splits the paths and creates an array
  const splittedPaths = asPath.split('/')
  // Gets the category tree of the last slug. Todo: Need to filter out category tree on the first slug to avoid get duplicated pathnames from another category branch
  const categoryObjectsFromPath = splittedPaths.map((path) => {
    //console.log(path)
    return getActiveCategoryTree(categoryTree, path)
  })
  //console.log(categoryObjectsFromPath)
  // Filter out empty objects in array
  const newArray = categoryObjectsFromPath.filter(
    (value) => Object.keys(value).length !== 0
  )
  console.log(newArray)
  // Adds the rigth paths to all categories in the url
  const list: any[] = []
  newArray.forEach((category) => {
    const foundIndex = splittedPaths.findIndex(
      (path) => path == getSlug(category.path)
    )
    console.log(category)
    // Creates full path to category in category tree and pushes it to a list
    //const newPaths = splittedPaths.slice(0, foundIndex + 1)
    //const copy = { ...category }
    //copy.path = newPaths.join('/')
    //category = copy
    list.push(category)
  })

  // Creates a list of all options and values (with no duplicates) of displayed products
  useEffect(() => {
    if (data && data.found) {
      const names: Filter[] = []
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
            const findDisplayName: Filter | Filter[] | undefined = names.find(
              (item) => item.name == option.displayName
            )
            if (findDisplayName) {
              const findValue = findDisplayName.values.find(
                (hej) => hej.value == value.label
              )
              if (!findValue) {
                findDisplayName.values.push({
                  value: value.label,
                  checked: false,
                })
              }
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

  /*   const handleClick = (event: any, filter: string) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  } */
  console.log(list)
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
                      {!activeCategoryTree.children ||
                      activeCategoryTree.children < 1 ? (
                        <span>Inga underkategorier tillgängliga</span>
                      ) : (
                        activeCategoryTree.children.map((category: any) => (
                          <li
                            key={category.name}
                            onClick={() => setMobileFiltersOpen(false)}
                          >
                            <Link href={'/search' + category.path}>
                              <div className="block px-2 py-3">
                                {category.name}
                              </div>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>

                    {filters.map((section) => (
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
                                  (option, optionIdx: number) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.name}-${optionIdx}`}
                                        name={`${section.name}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        onChange={() => {
                                          const copyFilters = [...filters]
                                          const updateFilter = copyFilters.map(
                                            (filter) => {
                                              if (filter.name == section.name) {
                                                filter.values.forEach((hej) => {
                                                  if (
                                                    hej.value == option.value
                                                  ) {
                                                    hej.checked = !hej.checked
                                                    return filter
                                                  }
                                                })
                                              }
                                              return filter
                                            }
                                          )
                                          setFilters(updateFilter)
                                        }}
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.name}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.value}
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
                  className={
                    !activeCategoryTree.children
                      ? 'space-y-4 pb-6 text-sm font-medium text-gray-900'
                      : 'space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'
                  }
                >
                  {!activeCategoryTree.children ||
                  activeCategoryTree.children.length < 1 ? (
                    <span className="font-thin text-xs">
                      Inga underkategorier tillgängliga
                    </span>
                  ) : (
                    activeCategoryTree.children.map(
                      (category: any, i: number) => (
                        <div key={i}>
                          {category.children &&
                          category.productCount < 1 &&
                          category.children.length <
                            1 ? null : !category.children &&
                            category.productCount < 1 ? null : (
                            <li key={category.name}>
                              <Link href={'/search' + category.path}>
                                {category.name}
                              </Link>
                            </li>
                          )}
                        </div>
                      )
                    )
                  )}
                </ul>

                {filters.length < 1 ? (
                  <span className="font-thin text-xs">
                    Inga filter tillgängliga
                  </span>
                ) : (
                  filters.map((section) => (
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
                                (option, optionIdx: number) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-${section.name}-${optionIdx}`}
                                      name={`${section.name}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      onChange={() => {
                                        const copyFilters = [...filters]
                                        const updateFilter = copyFilters.map(
                                          (filter) => {
                                            if (filter.name == section.name) {
                                              filter.values.forEach((hej) => {
                                                if (hej.value == option.value) {
                                                  hej.checked = !hej.checked
                                                  return filter
                                                }
                                              })
                                            }
                                            return filter
                                          }
                                        )
                                        setFilters(updateFilter)
                                      }}
                                    />
                                    <label
                                      htmlFor={`filter-${section.name}-${optionIdx}`}
                                      className="ml-3 text-sm text-gray-600"
                                    >
                                      {option.value}
                                    </label>
                                  </div>
                                )
                              )}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))
                )}
              </form>
              {/* Product grid */}
              {!data ? null : (
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
                  {ActiveProducts.length < 1 && values.length > 0 ? (
                    <span>Inga produkter matchade din filtrering</span>
                  ) : ActiveProducts.length > 0 ? (
                    ActiveProducts.map((product) => (
                      <Link key={product.id} href={'/product/' + product.slug}>
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
                            ? product.options.map((option) => {
                                if (
                                  option.displayName == 'Color' ||
                                  option.displayName == 'Färg'
                                ) {
                                  return option.values.map(
                                    (value, i: number) => {
                                      return (
                                        <li
                                          key={i}
                                          className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                          style={{
                                            backgroundColor: value.hexColors
                                              ? value.hexColors[0]
                                              : getEnglishColor(value.label),
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
                          {product.price.value +
                            ' ' +
                            product.price.currencyCode}
                        </p>
                      </Link>
                    ))
                  ) : !data.found ? (
                    <span>
                      Inga produkter finns för nuvarande på denna kategori
                    </span>
                  ) : (
                    data.products.map((product) => (
                      <Link key={product.id} href={'/product/' + product.slug}>
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
                            ? product.options.map((option) => {
                                if (
                                  option.displayName == 'Color' ||
                                  option.displayName == 'Färg'
                                ) {
                                  return option.values.map(
                                    (value, i: number) => {
                                      return (
                                        <li
                                          key={i}
                                          className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                          style={{
                                            backgroundColor: value.hexColors
                                              ? value.hexColors[0]
                                              : getEnglishColor(value.label),
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
                          {product.price.value +
                            ' ' +
                            product.price.currencyCode}
                        </p>
                      </Link>
                    ))
                  )}
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
