import { useState, useEffect, useRef, Fragment, FC } from 'react'
import axios from 'axios'
import DropDownProductCard from './DropDownProductCard'
import DropDownItem from './DropDownItem'
import SearchBarHeader from './SearchBarHeader'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'

interface Props {
  setSearchBar: any
  searchBarOpen: any
  searchQuery: string
  setSearchQuery: any
}

const SearchBar: FC<Props> = ({
  setSearchBar,
  searchBarOpen,
  searchQuery,
  setSearchQuery,
}) => {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [suggestedWords, setSuggestedWords] = useState([])
  console.log('kommer jag hit då?')
  useEffect(() => {
    console.log('Kommer jag in hit?')
    setTimeout(() => {
      fetchProductIds()
      fetchCategories()
      fetchSuggestedWords()
    }, 400)
  }, [searchQuery])

  const fetchProductIds = async () => {
    if (!searchQuery) {
      setFilteredProducts([])
      return
    }

    const result = await axios(
      `/api/search/search-predictive?searchQuery=${searchQuery}`
    )

    await fetchProducts(result.data)
  }

  const fetchProducts = async (productIds: any) => {
    if (!searchQuery) {
      setFilteredProducts([])
      return
    }
    if (!Array.isArray(productIds)) {
      return
    }
    const result = await axios(
      `/api/search/get-searched-products?productIds=${productIds}`
    )

    setFilteredProducts(result.data)
  }

  const fetchCategories = async () => {
    const result = await axios(
      `/api/search/search-categories?searchQuery=${searchQuery}`
    )
    setCategories(result.data)
  }

  const fetchSuggestedWords = async () => {
    const result = await axios(
      `/api/search/search-suggestions?searchQuery=${searchQuery}`
    )

    setSuggestedWords(result.data)
  }

  return (
    <Transition.Root show={searchBarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          setSearchBar(false)
          setSearchQuery('')
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Dialog.Panel className="absolute flex-col lg:h-auto w-full bg-white top-0 left-0 z-50">
              <SearchBarHeader
                setSearchBar={setSearchBar}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* SEARCH RESULTS STARTS HERE */}

              <div className="flex flex-col lg:flex-row w-full h-full p-4 ">
                <div className="flex-col items-center bg-white h-3/6 w-1/6 p-4">
                  {categories.length == 0 ? null : (
                    <p className="text-left font-medium text-lg">Kategorier</p>
                  )}
                  {categories &&
                    categories.map((category, i) => {
                      return <DropDownItem key={i} entity={category.name} />
                    })}

                  {suggestedWords.length == 0 ? null : (
                    <p className="text-left font-medium text-lg">Sökförslag</p>
                  )}

                  {suggestedWords &&
                    suggestedWords.map((word: any, i: number) => {
                      return <DropDownItem key={i} entity={word} />
                    })}
                </div>

                <div className="bg-white-600 lg:w-5/6 flex  pb-16 flex-wrap">
                  {filteredProducts &&
                    filteredProducts.map((product, i) => {
                      return (
                        <DropDownProductCard
                          key={i}
                          product={product}
                          setSearchBar={setSearchBar}
                        />
                      )
                    })}
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default SearchBar
