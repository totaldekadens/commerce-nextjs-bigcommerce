import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Collapse, useUI } from '@components/ui'

import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ErrorMessage from '@components/ui/ErrorMessage'
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline'
import { IconStarFilled } from '@tabler/icons-react'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const policies = [
  {
    name: 'International delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
]

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}
const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    setError(null)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
      if (err instanceof Error) {
        console.error(err)
        setError({
          ...err,
          message: 'Could not add item to cart. Please try again.',
        })
      }
    }
  }

  return (
    <div className={className}>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-medium text-gray-900">{product.name}</h1>
        <p className="text-xl font-medium text-gray-900">
          {product.price.value + ' ' + product.price.currencyCode}
        </p>
      </div>
      {/* Rewievs */}
      <div className="mb-10">
        <h2 className="sr-only">Reviews</h2>
        <div className="flex items-center">
          <p className="text-sm text-gray-700">
            {/* {product.rating} */}4.2
            <span className="sr-only"> out of 5 stars</span>
          </p>
          <div className="ml-1 flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <IconStarFilled
                key={rating}
                className={classNames(
                  /* product.rating  */ 4 > rating
                    ? 'text-yellow-400'
                    : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
            ·
          </div>
          <div className="ml-4 flex">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              See all {/* {product.reviewCount}  */} 512 reviews
            </a>
          </div>
        </div>
      </div>
      <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <div className="mb-5 rounded-2">
        {error && <ErrorMessage error={error} className="my-5" />}
        {process.env.COMMERCE_CART_ENABLED && (
          <Button
            aria-label="Add to Cart"
            type="button"
            className=" flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            //className={s.button}
            onClick={addToCart}
            loading={loading}
            disabled={variant?.availableForSale === false}
          >
            {variant?.availableForSale === false
              ? 'Not Available'
              : 'Add To Cart'}
          </Button>
        )}
      </div>
      <div>
        <div className=" font-medium text-gray-900 mt-2 ">Description</div>
        <div
          className="prose prose-sm mt-4 text-gray-500"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
      {/* Policies */}
      <section aria-labelledby="policies-heading" className="mt-10">
        <h2 id="policies-heading" className="sr-only">
          Our Policies
        </h2>

        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {policies.map((policy) => (
            <div
              key={policy.name}
              className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center"
            >
              <dt>
                <policy.icon
                  className="mx-auto h-6 w-6 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span className="mt-4 text-sm font-medium text-gray-900">
                  {policy.name}
                </span>
              </dt>
              <dd className="mt-1 text-sm text-gray-500">
                {policy.description}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div> */}

      {/* <div className="mt-6">
        <Collapse title="Care">
          This is a limited edition production run. Printing starts when the
          drop ends.
        </Collapse>
        <Collapse title="Details">
          This is a limited edition production run. Printing starts when the
          drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
          to COVID-19.
        </Collapse>
      </div> */}
    </div>
  )
}

export default ProductSidebar
